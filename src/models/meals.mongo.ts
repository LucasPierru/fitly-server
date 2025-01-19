import mongoose, { SchemaTypes } from "mongoose";
const { Schema, model } = mongoose;
import type { IRecipe } from "../types/recipes.types";

const mealSchema = new Schema<IRecipe>({
  id: Number,
  createdAt: Date,
  updatedAt: Date,
  title: String,
  image: String,
  servings: Number,
  readyInMinutes: Number,
  preparationMinutes: Number,
  cookingMinutes: Number,
  pricePerServing: Number,
  analyzedInstructions: [
    {
      name: String,
    },
  ],
  cheap: Boolean,
  cuisines: [String],
  dairyFree: Boolean,
  glutenFree: Boolean,
  ketogenic: Boolean,
  lowFodmap: Boolean,
  sustainable: Boolean,
  vegan: Boolean,
  vegetarian: Boolean,
  veryHealthy: Boolean,
  veryPopular: Boolean,
  dishTypes: [String],
  extendedIngredients: [
    {
      ingredientId: Number,
      quantity: Number,
      unit: String,
    },
  ],
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
  },
  summary: String,
});

const Meal = model<IRecipe>("Meal", mealSchema);
export default Meal;
