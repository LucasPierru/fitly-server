import { IIngredient } from "./ingredients.types";
import { IMeal } from "./meals.types";

export type Recipe = IMeal & { extendedIngredients: IIngredient[] };
