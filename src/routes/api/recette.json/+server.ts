import { error } from "@sveltejs/kit";
import {
  searchRecipes,
  MarmitonQueryBuilder,
  RECIPE_PRICE,
  RECIPE_DIFFICULTY,
  type Recipe,
} from "marmiton-api";

export async function GET({ url }) {
  const search = url.searchParams.get("q");

  if (!search) {
    throw error(404);
  }

  const qb = new MarmitonQueryBuilder();
  // A query builder is provided to make complex queries
  const query = qb.withTitleContaining(search).build();
  // Fetch the recipes
  const recipes: Recipe[] = await searchRecipes(query);

  if (recipes.length < 1) {
    throw error(404);
  }

  return new Response(JSON.stringify(recipes[0]), {
    headers: { "content-type": "application/json" },
  });
}
