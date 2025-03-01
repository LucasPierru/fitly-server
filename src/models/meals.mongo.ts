import mongoose, { SchemaTypes } from "mongoose";
const { Schema, model } = mongoose;
import type { IMeal } from "../types";

const mealSchema = new Schema<IMeal>({
  createdAt: Date,
  updatedAt: Date,
  title: String,
  image: String,
  servings: Number,
  readyInMinutes: Number,
  preparationMinutes: Number,
  cookingMinutes: Number,
  pricePerServing: Number,
  instructions: [
    {
      name: String,
      step: Number,
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
  ingredients: [
    {
      ingredient: {
        type: SchemaTypes.ObjectId,
        ref: "Ingredient",
        required: true,
      },
      quantity: Number,
      unit: String,
    },
  ],
  summary: String,
});

const Meal = model<IMeal>("Meal", mealSchema);
export default Meal;
