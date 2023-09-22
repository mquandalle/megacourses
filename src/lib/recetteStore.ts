import { writable } from "svelte/store";
import type { Recipe } from "marmiton-api";

export default writable<Array<Recipe>>([]);
