import express from "express";
import {
  httpGetFavoriteMeals,
  httpCreateFavoriteMeal,
} from "./favorite-meal.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const favoriteMealRouter = express.Router();

favoriteMealRouter.get("/", passportMiddleware, httpGetFavoriteMeals);
favoriteMealRouter.post("/create", passportMiddleware, httpCreateFavoriteMeal);

export default favoriteMealRouter;
