import mongoose, { SchemaTypes } from "mongoose";
import { ISavedMealPlan } from "../types";
const { Schema, model } = mongoose;

const savedMealPlanSchema = new Schema<ISavedMealPlan>(
  {
    name: String,
    description: String,
    meals: [
      {
        meal: { type: SchemaTypes.ObjectId, ref: "Meal", required: false },
        ingredient: {
          type: SchemaTypes.ObjectId,
          ref: "Ingredient",
          required: false,
        },
        quantity: Number,
        unit: String,
        dishType: String /*e.g.: breakfast, lunch, dinner, snack*/,
        day: String /*e.g.: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday*/,
      },
    ],
    user: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const SavedMealPlan = model("SavedMealPlan", savedMealPlanSchema);
export default SavedMealPlan;
