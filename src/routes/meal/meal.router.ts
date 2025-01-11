import express from "express";
import { httpCreateMeal, httpGetMeal, httpGetMeals } from "./meal.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const mealRouter = express.Router();

mealRouter.get("/details/:id", passportMiddleware, httpGetMeal);
mealRouter.get("/all", passportMiddleware, httpGetMeals);
mealRouter.post("/create", passportMiddleware, httpCreateMeal);

export default mealRouter;
