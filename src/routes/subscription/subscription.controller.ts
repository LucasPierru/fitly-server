import { Request, Response } from "express";
import User from "../../models/users.mongo";
import { cancelSubscription, createSubscription } from "../../services/subscription/subscription";
import Subscription from "../../models/subscriptions.mongo";
import Stripe from "stripe";

export const httpCreateSubscription = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);

    if (!user || !user.stripeCustomerId) throw Error("User not found or no stripe customer id");

    const subscription = await createSubscription(user.stripeCustomerId);
    const invoice: Stripe.Invoice = subscription.latest_invoice as Stripe.Invoice;
    const setup_intent = subscription.pending_setup_intent as Stripe.SetupIntent;
    const payment_intent: Stripe.PaymentIntent = invoice.payment_intent as Stripe.PaymentIntent;
    let client_secret: string | null = null;

    if (payment_intent) {
      client_secret = payment_intent.client_secret;
    } else if (setup_intent) {
      client_secret = setup_intent.client_secret;
    }

    res.status(200).json({
      subscriptionPrice: subscription.items.data[0].price.unit_amount,
      subscriptionCurrency: subscription.items.data[0].price.currency,
      clientSecret: client_secret,
      error: null,
      message: "success",
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ subscriptionId: null, clientSecret: null, error: error, message: "error" });
  }
};

export const httpCancelSubscription = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const subscription = await Subscription.findOne({ user: userId });

    if (!subscription) throw Error("Subscription not found");

    const canceledSubscription = await cancelSubscription(subscription?.stripeSubscriptionId);

    res.status(200).json({ canceledSubscription, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ canceledSubscription: null, error: error, message: "error" });
  }
};

export const httpGetSubscription = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const subscription = await Subscription.findOne({ user: userId });

    if (!subscription) throw Error("Subscription not found");

    res.status(200).json({ subscription, error: null, message: "success" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ subscription: null, error: error, message: "error" });
  }
};
