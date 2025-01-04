import mongoose from "mongoose";
import { DefaultProperties } from "./common.types";

export type IMealPlan = DefaultProperties & {
  name: string;
  description: string;
  meals: {
    mealId?: mongoose.Types.ObjectId;
    ingredientId?: number;
    quantity?: number;
    unit?: string;
    recipeId?: number;
    dishType: string; //e.g.: breakfast, lunch, dinner, snack
    day: string; //e.g.: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
  }[];
  userId: mongoose.Types.ObjectId;
};
