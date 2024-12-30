import express from "express";
import {
  httpCreateMealPlan,
  httpGetMealPlan,
  httpGetMealPlans,
} from "./meal-plan.controller";
import authMiddleware from "../../middleware/authMiddleware";

const mealPlanRouter = express.Router();

mealPlanRouter.get("/details/:id", authMiddleware, httpGetMealPlan);
mealPlanRouter.get("/all", httpGetMealPlans);
mealPlanRouter.post("/create", authMiddleware, httpCreateMealPlan);

export default mealPlanRouter;
