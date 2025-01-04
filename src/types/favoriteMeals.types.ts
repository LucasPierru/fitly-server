import mongoose from "mongoose";
import { DefaultProperties } from "./common.types";

export type IFavoriteMeal = DefaultProperties & {
  userId: mongoose.Types.ObjectId;
  mealId: mongoose.Types.ObjectId;
  recipeId: number;
  ingredientId: number;
};
