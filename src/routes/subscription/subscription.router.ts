import express from "express";
import passportMiddleware from "../../middleware/passportMiddleware";
import { httpCancelSubscription, httpCreateSubscription } from "./subscription.controller";

const subscriptionRouter = express.Router();

subscriptionRouter.post("/create", passportMiddleware, httpCreateSubscription);
subscriptionRouter.delete("/delete", passportMiddleware, httpCancelSubscription);

export default subscriptionRouter;
