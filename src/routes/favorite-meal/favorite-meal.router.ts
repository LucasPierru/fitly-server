import express from "express";
import {
  httpGetFavoriteMeals,
  httpCreateFavoriteMeal,
} from "./favorite-meal.controller";
import authMiddleware from "../../middleware/authMiddleware";

const favoriteMealRouter = express.Router();

favoriteMealRouter.get("/", authMiddleware, httpGetFavoriteMeals);
favoriteMealRouter.post("/create", authMiddleware, httpCreateFavoriteMeal);

export default favoriteMealRouter;
