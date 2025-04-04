import Meal from "../models/meals.mongo";
import { IMeal } from "../types/meals.types";

export const createMeal = async (mealData: IMeal): Promise<IMeal> => {
  try {
    const newMeal = new Meal({
      ...mealData,
    });
    const meal = await newMeal.save();
    return meal;
  } catch (error) {
    throw error;
  }
};
