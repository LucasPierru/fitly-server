import { UpdateWriteOpResult } from "mongoose";
import Ingredient from "../models/ingredients.mongo";
import { IIngredient } from "../types/ingredients.types";
import { BulkWriteResult } from "mongodb";
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

export const createIngredient = async (
  ingredientData: IIngredient
): Promise<IIngredient> => {
  try {
    const newIngredient = new Ingredient({
      ...ingredientData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const ingredient = await newIngredient.save();
    return ingredient;
  } catch (error) {
    throw error;
  }
};

export const createIngredients = async (
  ingredientsData: IIngredient[]
): Promise<BulkWriteResult> => {
  try {
    const bulkOperations = ingredientsData.map((ingredient) => ({
      updateOne: {
        filter: { name: ingredient.name },
        update: { $set: ingredient },
        upsert: true,
      },
    }));
    const newIngredients = await Ingredient.bulkWrite(bulkOperations);
    console.log({ newIngredients });
    return newIngredients;
  } catch (error) {
    throw error;
  }
};
