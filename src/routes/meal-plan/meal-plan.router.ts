import express from "express";
import {
  httpCreateMealPlan,
  httpGetMealPlan,
  httpGetMealPlans,
} from "./meal-plan.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const mealPlanRouter = express.Router();

mealPlanRouter.get("/details/:id", passportMiddleware, httpGetMealPlan);
mealPlanRouter.get("/all", httpGetMealPlans);
mealPlanRouter.post("/create", passportMiddleware, httpCreateMealPlan);

export default mealPlanRouter;
