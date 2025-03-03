import mongoose, { SchemaTypes } from "mongoose";
import { IFoodLog } from "../types";
const { Schema, model } = mongoose;

const foodLogSchema = new Schema<IFoodLog>(
  {
    user: { type: SchemaTypes.ObjectId, ref: "User", required: true },
    ingredient: {
      type: SchemaTypes.ObjectId,
      ref: "Ingredient",
      required: false,
    },
    quantity: Number,
    unit: String,
    meal: { type: SchemaTypes.ObjectId, ref: "Meal", required: false },
    dishType: String, // e.g.: breakfast, lunch, dinner, snack
  },
  { timestamps: true }
);

const FoodLog = model("FoodLog", foodLogSchema);
export default FoodLog;
