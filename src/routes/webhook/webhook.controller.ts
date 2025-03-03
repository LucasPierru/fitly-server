import stripe from "stripe";
import { Request, Response } from "express";
import Subscription from "../../models/subscriptions.mongo";
import "dotenv/config";
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!);

export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripeInstance.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object;
      await Subscription.findOneAndUpdate(
        { stripeSubscriptionId: subscription.id },
        {
          status: subscription.status,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        }
      );
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
