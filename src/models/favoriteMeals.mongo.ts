import mongoose, { SchemaTypes } from "mongoose";
import { IFavoriteMeal } from "../types/favoriteMeals.types";
const { Schema, model } = mongoose;

const favoriteMealsSchema = new Schema<IFavoriteMeal>({
  createdAt: Date,
  updatedAt: Date,
  mealId: { type: SchemaTypes.ObjectId, ref: "Meal", required: false },
  ingredientId: Number,
  recipeId: Number,
  userId: { type: SchemaTypes.ObjectId, ref: "User", required: true },
});

const FavoriteMeal = model("FavoriteMeal", favoriteMealsSchema);
export default FavoriteMeal;
