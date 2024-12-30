import express from "express";
import { httpCreateMeal, httpGetMeal, httpGetMeals } from "./meal.controller";
import authMiddleware from "../../middleware/authMiddleware";

const mealRouter = express.Router();

mealRouter.get("/details/:id", authMiddleware, httpGetMeal);
mealRouter.get("/all", authMiddleware, httpGetMeals);
mealRouter.post("/create", authMiddleware, httpCreateMeal);

export default mealRouter;
