import { IRecipe } from "../types/recipes.types";

const BASE_URL = "https://api.spoonacular.com";

export const getRecipe = async (
  id: string
): Promise<{ data: IRecipe | null; error: Error | null }> => {
  try {
    const res = await fetch(
      `${BASE_URL}/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&includeNutrition=true`
    );
    const data: IRecipe = await res.json();

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};
