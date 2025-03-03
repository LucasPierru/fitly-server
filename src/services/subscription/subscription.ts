import stripe from "stripe";
import "dotenv/config";
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!);

export const createSubscription = async (stripeCustomerId: string) => {
  const session = await stripeInstance.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ["card"],
    line_items: [{ price: "price_1QyhP7RspX9AHcm1jTJqxJEW", quantity: 1 }],
    mode: "subscription",
    success_url: `https://yourapp.com/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "https://yourapp.com/cancel",
    subscription_data: {
      trial_period_days: 7, // 7-day free trial
    },
  });

  return session;
};

export const cancelSubscription = async (subscriptionId: string) => {
  const subscription = await stripeInstance.subscriptions.cancel(subscriptionId);
  return subscription;
};
