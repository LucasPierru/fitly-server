import { Request, Response } from "express";
import User from "../../models/users.mongo";
import { cancelSubscription, createSubscription } from "../../services/subscription/subscription";
import Subscription from "../../models/subscriptions.mongo";

export const httpCreateSubscription = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user || !user.stripeCustomerId) throw Error("User not found or no stripe customer id");

    const session = await createSubscription(user.stripeCustomerId);

    res.status(200).json({ sessionId: session.id, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ sessionId: null, error: error, message: "error" });
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
