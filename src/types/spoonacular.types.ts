import { IIngredient } from "./ingredients.types";
import { IRecipe } from "./recipes.types";

export type Recipe = IRecipe & { extendedIngredients: IIngredient[] };
