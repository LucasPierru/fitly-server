import stripe from "stripe";
import "dotenv/config";
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!);

export const createCustomer = async (email: string, name: string) => {
  // Create a Stripe Customer
  const customer = await stripeInstance.customers.create({
    email,
    name: name,
    payment_method: "pm_card_visa",
    invoice_settings: {
      default_payment_method: "pm_card_visa",
    },
  });

  return customer;
};
