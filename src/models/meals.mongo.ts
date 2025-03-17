import mongoose, { SchemaTypes } from "mongoose";
const { Schema, model } = mongoose;
import type { IMeal } from "../types";

const mealSchema = new Schema<IMeal>(
  {
    title: String,
    image: String,
    description: String,
    servings: Number,
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
    isPublic: Boolean,
    isApproved: Boolean,
    creator: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    nutrition: {
      calories: Number,
      protein: Number,
      fat: Number,
      carbs: Number,
    }
  },
  { timestamps: true }
);

const Meal = model<IMeal>("Meal", mealSchema);
export default Meal;
