import mongoose from "mongoose";
import { DefaultProperties } from "./common.types";

export type IMealPlan = DefaultProperties & {
  name: string;
  description: string;
  meals: {
    mealId?: mongoose.Types.ObjectId;
    ingredientId?: mongoose.Types.ObjectId;
    quantity?: number;
    dishType: string /*e.g.: breakfast, lunch, dinner, snack*/;
  }[];
  userId: mongoose.Types.ObjectId;
};
