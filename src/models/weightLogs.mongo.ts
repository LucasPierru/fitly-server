import mongoose, { SchemaTypes } from "mongoose";
import { IWeightLog } from "../types/weightLogs.types";
const { Schema, model } = mongoose;

const weightLogSchema = new Schema<IWeightLog>({
  createdAt: Date,
  updatedAt: Date,
  userId: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  weight: Number,
  bodyFatPercentage: Number,
});

const WeightLog = model("WeightLog", weightLogSchema);
export default WeightLog;
