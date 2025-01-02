import mongoose from "mongoose";
import { DefaultProperties } from "./common.types";
import { IRecipe } from "./recipes.types";
import { IIngredient } from "./ingredients.types";
import { Recipe } from "./spoonacular.types";

export type IMealPlan = DefaultProperties & {
  name: string;
  description: string;
  meals: {
    mealId?: mongoose.Types.ObjectId;
    ingredientId?: mongoose.Types.ObjectId;
    quantity?: number;
    dishType: string; //e.g.: breakfast, lunch, dinner, snack
    day: string; //e.g.: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
  }[];
  userId: mongoose.Types.ObjectId;
};

export type IMealPlanInsert = DefaultProperties & {
  name: string;
  description: string;
  meals: Recipe[];
  ingredients: IIngredient[];
  userId: mongoose.Types.ObjectId;
};
