import express from "express";
import passportMiddleware from "../../middleware/passportMiddleware";
import { httpCancelSubscription, httpCreateSubscription, httpGetSubscription } from "./subscription.controller";

const subscriptionRouter = express.Router();

subscriptionRouter.get("/", passportMiddleware, httpGetSubscription);
subscriptionRouter.post("/create", passportMiddleware, httpCreateSubscription);
subscriptionRouter.delete("/delete", passportMiddleware, httpCancelSubscription);

export default subscriptionRouter;
