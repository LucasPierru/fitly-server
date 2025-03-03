import express from "express";
import { httpAddMeal, httpCreateMeal, httpGetMeal, httpGetMeals, httpGetUserMeals } from "./meal.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const mealRouter = express.Router();

mealRouter.get("/details/:id", passportMiddleware, httpGetMeal);
mealRouter.get("/all", passportMiddleware, httpGetMeals);
mealRouter.get("/user-meals", passportMiddleware, httpGetUserMeals);
mealRouter.post("/create", passportMiddleware, httpCreateMeal);
mealRouter.post("/add", passportMiddleware, httpAddMeal);

export default mealRouter;
