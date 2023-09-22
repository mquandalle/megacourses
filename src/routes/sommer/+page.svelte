<script>
  import { recettes } from "./recettes.json";
  import categories from "./categories.json";

  let selectedItems = 1;

  function groupByCategory(ingredients) {
    const grouped = {};

    ingredients.forEach((ingredient) => {
      if (!grouped[ingredient.categorie]) {
        grouped[ingredient.categorie] = [];
      }
      grouped[ingredient.categorie].push(ingredient);
    });

    return Object.entries(grouped);
  }

  function mergeAllRecettes() {
    const allIngredients = [];

    recettes.forEach((recette) => {
      allIngredients.push(...recette.ingredients);
    });

    return groupByCategory(allIngredients);
  }

  $: groupedIngredients =
    selectedItems !== null
      ? Array.isArray(selectedItems)
        ? mergeAllRecettes()
        : groupByCategory(recettes[selectedItems].ingredients)
      : [];
</script>

<div class="flex flex-row">
  <div class="pr-4 mr-8 border-r text-right w-60">
    <ul class=" list-inside">
      {#each recettes as recette, i}
        <li
          class="cursor-pointer px-2 py-2 hover:underline {selectedItems ===
            i && 'bg-purple-100 font-bold'}"
          on:click={() => (selectedItems = i)}
        >
          {recette.nom}
        </li>
      {/each}
    </ul>

    <button
      class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4 inline-flex flex-row items-center"
      on:click={() => (selectedItems = recettes.map((_, i) => i))}
    >
      Sélectionner tout <span class="text-2xl ml-2">🤤</span>
    </button>
  </div>

  <div>
    {#if selectedItems !== null}
      <ul class=" list-inside">
        {#each groupedIngredients as [category, ingredients]}
          <li class="my-2">
            <strong class="text-xl block mb-2 mt-6"
              >{categories.find((c) => c.nom === category).emoji}
              {category}</strong
            >
            <ul class="ml-7">
              {#each ingredients as ingredient}
                <li>
                  <span class="font-mono font-bold inline-block min-w-[50px]">
                    {ingredient.quantite}
                  </span>
                  {ingredient.nom}
                </li>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
