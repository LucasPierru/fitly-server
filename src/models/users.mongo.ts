import mongoose from "mongoose";
import { hashPassword } from "../services/hash";
import { IUser } from "../types";
const { Schema, model } = mongoose;

const userSchema = new Schema<IUser>({
  createdAt: Date,
  updatedAt: Date,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  weight: Number,
  height: Number,
  birthday: String,
  sex: { type: String, enum: ["male", "female"] },
  bmr: Number,
  howActive: {
    type: String,
    enum: ["sedentary", "light", "moderate", "active", "very_active"],
  },
  goal: {
    type: String,
    enum: ["fat_loss", "muscle_gain", "improve_stamina", "maintenance"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

const User = model<IUser>("User", userSchema);
export default User;
