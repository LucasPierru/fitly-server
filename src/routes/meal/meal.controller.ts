import { Request, Response } from "express";
import Meal from "../../models/meals.mongo";
import { IMeal } from "../../types/meals.types";

export const httpGetMeal = async (req: Request, res: Response) => {
  try {
    const meal = await Meal.findById(req.params.id);
    res.status(200).json({ meal, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ meal: null, error, message: "error" });
  }
};

export const httpGetMeals = async (req: Request, res: Response) => {
  try {
    const meals = await Meal.find({ user: req.user!.id });
    res.status(200).json({ meals, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ meals: null, error, message: "error" });
  }
};

export const httpCreateMeal = async (req: Request<{}, {}, IMeal>, res: Response) => {
  try {
    const meal = await Meal.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: { ...req.body, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date(), user: req.user!.id },
      },
      { upsert: true, new: true }
    );
    res.status(201).json({ meal, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({ meal: null, error, message: "error" });
  }
};
