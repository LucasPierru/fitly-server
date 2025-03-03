import { Request, Response } from "express";
import MealPlan from "../../models/mealPlans.mongo";
import { IMealPlan } from "../../types/mealPlans.types";

export const httpGetMealPlan = async (req: Request, res: Response) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);
    res.status(200).json({ mealPlan, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ mealPlan: null, error, message: "error" });
  }
};

export const httpGetMealPlans = async (req: Request, res: Response) => {
  try {
    const mealPlans = await MealPlan.find({ user: req.user!.id });
    res.status(200).json({ mealPlans, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ mealPlans: null, error, message: "error" });
  }
};

export const httpCreateMealPlan = async (req: Request<{}, {}, IMealPlan>, res: Response) => {
  try {
    const mealPlan = await MealPlan.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: req.body,
        $setOnInsert: { user: req.user!.id },
      },
      { upsert: true, new: true }
    );
    res.status(201).json({ mealPlan, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({ mealPlan: null, error, message: "error" });
  }
};
