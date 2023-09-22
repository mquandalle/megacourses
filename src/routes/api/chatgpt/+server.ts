import OpenAI from "openai";
import categories from "../../sommer/categories.json";
import { OPENAI_API_KEY } from "$env/static/private";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const systemPrompt = `
Extracteur des données JSON d'une liste d'ingrédient. Pour chaque ingrédient il faut identifier :

- le nom
- la quantité
- la catégorie parmi la liste ci-dessous

Catégories :
${categories.map((c) => `- ${c.nom}`).join("\n")}

Retourne uniquement le JSON sans ajouter de commentaire.
`;

const example = {
  input: `
1 tête de laitue
100g de parmesan
50g de croutons
`.trim(),

  output: `
[
    {
    "nom": "Laitue",
    "quantite": "1 tête",
    "categorie": "Légumes"
    },
    {
    "nom": "Parmesan",
    "quantite": "100 g",
    "categorie": "Produits Laitiers"
    },
    {
    "nom": "Croûtons",
    "quantite": "50 g",
    "categorie": "Pâtisserie et Boulangerie"
    }
]
`.trim(),
};

export async function POST({ request }) {
  const body = await request.json();

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: example.input },
      { role: "assistant", content: example.output },
      { role: "user", content: body.input },
    ],
    model: "gpt-3.5-turbo",
  });

  const response = completion.choices[0].message.content;

  return new Response(response, {
    headers: { "content-type": "application/json" },
  });
}
