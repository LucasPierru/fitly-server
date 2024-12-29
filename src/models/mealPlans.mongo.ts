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
      ingredientId: {
        type: SchemaTypes.ObjectId,
        ref: "Ingredient",
        required: false,
      },
      quantity: Number,
      dishType: String /*e.g.: breakfast, lunch, dinner, snack*/,
    },
  ],
  userId: { type: SchemaTypes.ObjectId, ref: "User", required: true },
});

const MealPlan = model("MealPlan", mealPlanSchema);
export default MealPlan;
