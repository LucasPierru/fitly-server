import mongoose from "mongoose";
import { IIngredientCategory } from "../types";
const { Schema, model } = mongoose;

const ingredientCategorySchema = new Schema<IIngredientCategory>(
  {
    name: String,
  },
  { timestamps: true }
);

const IngredientCategory = model<IIngredientCategory>("IngredientCategorie", ingredientCategorySchema);
export default IngredientCategory;
