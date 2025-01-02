import Meal from "../models/meals.mongo";
import { IRecipe } from "../types/recipes.types";
import { BulkWriteResult } from "mongodb";
import { createIngredients } from "./ingredients";
import { Recipe } from "../types/spoonacular.types";

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

export const createMeals = async (
  mealsData: Recipe[]
): Promise<BulkWriteResult> => {
  try {
    const ingredients = mealsData
      .map((meal) => meal.extendedIngredients)
      .flat();
    createIngredients(ingredients);
    console.log({ ingredients });
    /* const bulkOperations = mealsData.map((meal) => ({
      updateOne: {
        filter: { id: meal.id },
        update: { $set: meal },
        upsert: true,
      },
    }));
    const newMeals = await Meal.bulkWrite(bulkOperations);
    console.log({ newMeals });
    return newMeals; */
  } catch (error) {
    throw error;
  }
};
