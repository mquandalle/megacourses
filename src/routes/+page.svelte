<script lang="ts">
  import recettes from "$lib/recetteStore.ts";
  let recipeInput = "";

  let currentRecetteSelected = null;
  async function addRecipe() {
    if (recipeInput) {
      const res = await fetch(
        "/api/recette.json?q=" + encodeURIComponent(recipeInput)
      );
      const resJson = await res.json();

      gptNormalize(resJson.ingredients.join("\n"));
      recettes.update((r) => [...r, resJson]);
    }
  }

  let gptAnswer = "";

  async function gptNormalize(input) {
    gptAnswer = "Chargement...";
    const res = await fetch("/api/chatgpt", {
      method: "POST",
      body: JSON.stringify({ input }),
    });

    gptAnswer = await res.text();
  }
</script>

<h1>Ajouter un recette depuis marmiton</h1>

<form on:submit={addRecipe}>
  <label
    >Que voulez-vous cuisiner ?<br />
    <input class="border" type="text" bind:value={recipeInput} />
  </label>
  <input type="submit" value="Ajouter" />
</form>

<ul>
  {#each $recettes as recette, i}
    <li
      on:click={() => (currentRecetteSelected = i)}
      style:background={currentRecetteSelected === i
        ? "lightblue"
        : "transparent"}
    >
      {recette.name}
    </li>
  {/each}
</ul>

{#if currentRecetteSelected !== null}
  <hr />
  <ul>
    {#each $recettes[currentRecetteSelected].ingredients as ingredient}
      <li>{ingredient}</li>
    {/each}
  </ul>
{/if}

<pre>
{gptAnswer}
</pre>

<hr class="mt-8 mb-4" />

<a href="/sommer" class="underline text-purple-800 hover:text-purple-600"
  >Page "sommer"</a
>
