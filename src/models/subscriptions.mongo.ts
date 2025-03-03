import mongoose from "mongoose";
import { ISubscription } from "../types";
const { Schema, model } = mongoose;

const subscriptionSchema = new Schema<ISubscription>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stripeSubscriptionId: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["active", "trialing", "past_due", "canceled", "unpaid"],
      required: true,
    },
    currentPeriodStart: { type: Date, required: true },
    currentPeriodEnd: { type: Date, required: true },
  },
  { timestamps: true }
);

const Subscription = model("Subscription", subscriptionSchema);
export default Subscription;
