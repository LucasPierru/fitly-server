import express from "express";
import { httpGetFavoriteMeals, httpCreateFavoriteMeal, httpDeleteFavoriteMeal } from "./favorite-meal.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const favoriteMealRouter = express.Router();

favoriteMealRouter.get("/all", passportMiddleware, httpGetFavoriteMeals);
favoriteMealRouter.post("/create", passportMiddleware, httpCreateFavoriteMeal);
favoriteMealRouter.delete("/delete/:mealId", passportMiddleware, httpDeleteFavoriteMeal);

export default favoriteMealRouter;
