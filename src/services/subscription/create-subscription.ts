import stripe from "stripe";
import Subscription from "../../models/subscriptions.mongo";
import User from "../../models/users.mongo";
import { Types } from "mongoose";
import "dotenv/config";
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!);

export const createSubscription = async (userId: string, email: string) => {
  // Create a Stripe Customer
  const customer = await stripeInstance.customers.create({ email });

  // Create a Subscription with a 7-day free trial
  const subscription = await stripeInstance.subscriptions.create({
    customer: customer.id,
    items: [{ price: "price_12345" }], // Replace with your Stripe price ID
    trial_period_days: 7,
  });

  // Create Subscription in MongoDB
  const newSubscription = await Subscription.create({
    userId,
    stripeSubscriptionId: subscription.id,
    status: subscription.status,
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
  });

  // Update User with Stripe Customer ID & Subscription Reference
  await User.findByIdAndUpdate(userId, {
    stripeCustomerId: customer.id,
    subscription: newSubscription._id,
  });

  return { newSubscription, customer };
};
