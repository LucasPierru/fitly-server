import mongoose from "mongoose";
import { DefaultProperties } from "./common.types";

export type IFoodLog = DefaultProperties & {
  userId: mongoose.Types.ObjectId;
  ingredientId?: mongoose.Types.ObjectId;
  quantity?: number;
  mealId?: mongoose.Types.ObjectId;
  dishType: string; // e.g.: breakfast, lunch, dinner, snack
};
