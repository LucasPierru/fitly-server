import mongoose, { SchemaTypes } from "mongoose";
import { IUserMeal } from "../types";
const { Schema, model } = mongoose;

const userMealSchema = new Schema<IUserMeal>(
  {
    meal: { type: SchemaTypes.ObjectId, ref: "Meal", required: true },
    user: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const UserMeal = model("UserMeal", userMealSchema);
export default UserMeal;
