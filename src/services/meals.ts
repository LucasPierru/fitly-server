import Meal from "../models/meals.mongo";
import { IRecipe } from "../types/recipes.types";

export const createMeal = async (mealData: IRecipe): Promise<IRecipe> => {
  try {
    const newMeal = new Meal({
      ...mealData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const meal = await newMeal.save();
    return meal;
  } catch (error) {
    throw error;
  }
};
