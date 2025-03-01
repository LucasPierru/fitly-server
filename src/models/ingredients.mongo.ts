import mongoose, { SchemaTypes } from "mongoose";
const { Schema, model } = mongoose;
import type { IIngredient } from "../types";

const ingredientSchema = new Schema<IIngredient>({
  usdaId: Number,
  createdAt: Date,
  updatedAt: Date,
  name: String,
  amount: Number,
  unit: String,
  unitShort: String,
  alternateUnits: [
    {
      amount: Number,
      unit: String,
      gramWeight: Number,
    },
  ],
  estimatedCost: {
    value: Number,
    unit: String,
  },
  image: String,
  category: {
    type: SchemaTypes.ObjectId,
    ref: "IngredientCategorie",
    required: true,
  },
  nutrients: [
    {
      name: String,
      amount: Number,
      unit: String,
      percentOfDailyNeeds: Number,
    },
  ],
});

const Ingredient = model<IIngredient>("Ingredient", ingredientSchema);
export default Ingredient;
