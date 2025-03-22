import express from "express";
import {
  httpAddMealToMealPlan,
  httpCreateMealPlan,
  httpGetMealPlan,
  httpGetMealPlans,
  httpRemoveMealFromMealPlan,
} from "./meal-plan.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const mealPlanRouter = express.Router();

mealPlanRouter.get("/details/:id", passportMiddleware, httpGetMealPlan);
mealPlanRouter.get("/all", passportMiddleware, httpGetMealPlans);
mealPlanRouter.post("/create", passportMiddleware, httpCreateMealPlan);
mealPlanRouter.post("/add-meal", passportMiddleware, httpAddMealToMealPlan);
mealPlanRouter.post("/remove-meal", passportMiddleware, httpRemoveMealFromMealPlan);

export default mealPlanRouter;
