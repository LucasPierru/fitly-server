import mongoose, { SchemaTypes } from "mongoose";
import { IWeightLog } from "../types";
const { Schema, model } = mongoose;

const weightLogSchema = new Schema<IWeightLog>(
  {
    user: { type: SchemaTypes.ObjectId, ref: "User", required: true },
    weight: Number,
    bodyFatPercentage: Number,
  },
  { timestamps: true }
);

const WeightLog = model("WeightLog", weightLogSchema);
export default WeightLog;
