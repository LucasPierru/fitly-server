import stripe from "stripe";
import "dotenv/config";
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!);

export const createSubscription = async (stripeCustomerId: string) => {
  const subscription = await stripeInstance.subscriptions.create({
    customer: stripeCustomerId,
    items: [{ price: "price_1QyhP7RspX9AHcm1jTJqxJEW", quantity: 1 }],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent", "pending_setup_intent"],
    //trial_period_days: 7, // 7-day free trial
  });

  return subscription;
};

export const cancelSubscription = async (subscriptionId: string) => {
  const subscription = await stripeInstance.subscriptions.cancel(subscriptionId);
  return subscription;
};
