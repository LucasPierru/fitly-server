import mongoose from "mongoose";
const { Schema, model } = mongoose;
import type { IIngredient } from "../types/ingredients.types";

const ingredientSchema = new Schema<IIngredient>({
  id: Number,
  createdAt: Date,
  updatedAt: Date,
  original: String,
  originalName: String,
  name: String,
  amount: Number,
  unit: String,
  unitShort: String,
  possibleUnits: [String],
  estimatedCost: {
    value: Number,
    unit: String,
  },
  consistency: String,
  shoppingListUnits: [String],
  aisle: String,
  image: String,
  meta: [String],
  nutrition: {
    nutrients: [
      {
        name: String,
        amount: Number,
        unit: String,
        percentOfDailyNeeds: Number,
      },
    ],
    properties: [
      {
        name: String,
        amount: Number,
        unit: String,
      },
    ],
    flavonoids: [
      {
        name: String,
        amount: Number,
        unit: String,
      },
    ],
    caloricBreakdown: {
      percentProtein: Number,
      percentFat: Number,
      percentCarbs: Number,
    },
    weightPerServing: {
      amount: Number,
      unit: String,
    },
  },
  categoryPath: [String],
});

const Ingredient = model<IIngredient>("Ingredient", ingredientSchema);
export default Ingredient;
