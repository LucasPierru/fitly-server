import express from "express";
import {
  httpAddMealToMealPlan,
  httpCreateMealPlan,
  httpGetMealPlan,
  httpGetMealPlans,
  httpRemoveMealFromMealPlan,
  httpCreateSavedMealPlan,
  httpGetSavedMealPlan,
  httpGetSavedMealPlans,
  httpAddMealToSavedMealPlan,
  httpRemoveMealFromSavedMealPlan,
  httpGetSavedMealPlanMetadata,
} from "./meal-plan.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const mealPlanRouter = express.Router();

mealPlanRouter.get("/current", passportMiddleware, httpGetMealPlan);
mealPlanRouter.get("/all", passportMiddleware, httpGetMealPlans);
mealPlanRouter.post("/create", passportMiddleware, httpCreateMealPlan);
mealPlanRouter.post("/add-meal", passportMiddleware, httpAddMealToMealPlan);
mealPlanRouter.post("/remove-meal", passportMiddleware, httpRemoveMealFromMealPlan);

mealPlanRouter.post("/saved/create", passportMiddleware, httpCreateSavedMealPlan);
mealPlanRouter.get("/saved/details/:id", passportMiddleware, httpGetSavedMealPlan);
mealPlanRouter.get("/saved/metadata/:id", passportMiddleware, httpGetSavedMealPlanMetadata);
mealPlanRouter.get("/saved/all", passportMiddleware, httpGetSavedMealPlans);
mealPlanRouter.post("/saved/add-meal", passportMiddleware, httpAddMealToSavedMealPlan);
mealPlanRouter.post("/saved/remove-meal", passportMiddleware, httpRemoveMealFromSavedMealPlan);

export default mealPlanRouter;
