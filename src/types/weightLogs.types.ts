import mongoose from "mongoose";
import { DefaultProperties } from "./common.types";

export type IWeightLog = DefaultProperties & {
  userId: mongoose.Types.ObjectId;
  weight: number;
  bodyFatPercentage: number;
};
