import express from "express";
import authRouter from "./auth/auth.router";
import mealPlanRouter from "./meal-plan/meal-plan.router";
import mealRouter from "./meal/meal.router";
import foodLogRouter from "./food-log/food-log.router";
import weightLogRouter from "./weight-log/weight-log.router";
import favoriteMealRouter from "./favorite-meal/favorite-meal.router";
import profileRouter from "./profile/profile.router";

const api = express.Router();

api.use("/auth", authRouter);
api.use("/profile", profileRouter);
api.use("/meal", mealRouter);
api.use("/meal-plan", mealPlanRouter);
api.use("/food-log", foodLogRouter);
api.use("/weight-log", weightLogRouter);
api.use("/favorite-meal", favoriteMealRouter);

export default api;
