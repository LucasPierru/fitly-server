import mongoose, { SchemaTypes } from "mongoose";
import { IMealPlan } from "../types/mealPlans.types";
const { Schema, model } = mongoose;

const mealPlanSchema = new Schema<IMealPlan>({
  createdAt: Date,
  updatedAt: Date,
  name: String,
  description: String,
  meals: [
    {
      mealId: { type: SchemaTypes.ObjectId, ref: "Meal", required: false },
      ingredientId: Number,
      quantity: Number,
      recipeId: Number,
      unit: String,
      dishType: String /*e.g.: breakfast, lunch, dinner, snack*/,
      day: String /*e.g.: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday*/,
    },
  ],
  userId: { type: SchemaTypes.ObjectId, ref: "User", required: true },
});

const MealPlan = model("MealPlan", mealPlanSchema);
export default MealPlan;
