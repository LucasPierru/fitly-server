import mongoose from "mongoose";
import { IIngredientCategory } from "../types";
const { Schema, model } = mongoose;

const ingredientCategorySchema = new Schema<IIngredientCategory>({
  createdAt: Date,
  updatedAt: Date,
  name: String,
});

const IngredientCategory = model<IIngredientCategory>(
  "IngredientCategorie",
  ingredientCategorySchema
);
export default IngredientCategory;
