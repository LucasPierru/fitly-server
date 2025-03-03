import mongoose from "mongoose";
import { hashPassword } from "../services/hash";
import { IUser } from "../types";
const { Schema, model } = mongoose;

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    birthday: { type: Date, required: true },
    sex: { type: String, enum: ["male", "female"], required: true },
    bmr: { type: Number, required: false },
    howActive: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "very_active"],
      required: true,
    },
    goal: {
      type: String,
      enum: ["fat_loss", "muscle_gain", "improve_stamina", "maintenance"],
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

const User = model<IUser>("User", userSchema);
export default User;
