import Ingredient from "../../models/ingredients.mongo";
import { IIngredient } from "../../types/ingredients.types";

export const createIngredients = async (ingredients: Omit<IIngredient, "createdAt" | "updatedAt">[]) => {
  try {
    const operations = ingredients.map((ingredient: any) => {
      return {
        updateOne: {
          filter: { name: ingredient.name },
          update: {
            $set: ingredient,
          },
          upsert: true,
        },
      };
    });

    const newIngredients = await Ingredient.bulkWrite(operations);
    return newIngredients;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
