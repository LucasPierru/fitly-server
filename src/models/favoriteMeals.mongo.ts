import mongoose, { SchemaTypes } from "mongoose";
import { IFavoriteMeal } from "../types";
const { Schema, model } = mongoose;

const favoriteMealsSchema = new Schema<IFavoriteMeal>({
  createdAt: Date,
  updatedAt: Date,
  meal: { type: SchemaTypes.ObjectId, ref: "Meal", required: false },
  ingredient: {
    type: SchemaTypes.ObjectId,
    ref: "Ingredient",
    required: false,
  },
  user: { type: SchemaTypes.ObjectId, ref: "User", required: true },
});

const FavoriteMeal = model("FavoriteMeal", favoriteMealsSchema);
export default FavoriteMeal;
