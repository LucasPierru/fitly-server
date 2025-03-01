import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ingredientCategorySchema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  name: String,
});

const IngredientCategory = model(
  "IngredientCategorie",
  ingredientCategorySchema
);
export default IngredientCategory;
