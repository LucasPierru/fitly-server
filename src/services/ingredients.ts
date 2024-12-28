import { IIngredient } from "../types/ingredients.types";
const BASE_URL = "https://api.spoonacular.com";

export const getIngredientInformation = async (
  id: number,
  amount: number,
  unit: string
): Promise<{ data: IIngredient | null; error: Error | null }> => {
  try {
    const res = await fetch(
      `${BASE_URL}/food/ingredients/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&amount=${amount}&unit=${unit}`
    );
    const data: IIngredient = await res.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};
