import { Request, Response } from "express";
import MealPlan from "../../models/mealPlans.mongo";
import { IMealPlan } from "../../types/mealPlans.types";
import { Types } from "mongoose";

export const httpGetMealPlan = async (req: Request, res: Response) => {
  const day = req.query.day;
  try {
    const mealPlan = await MealPlan.findById(req.params.id)
      .populate({
        path: 'meals.meal', // Populate the 'meal' reference in the 'meals' array
        model: 'Meal',
      })
      .then(mealPlan => {
        // Filter meals based on the day query param
        if (mealPlan) {
          const filteredMeals = mealPlan.meals.filter(meal => meal.day === day);
          mealPlan.meals = filteredMeals; // Update meals with the filtered list
        }
        return mealPlan;
      });
    res.status(200).json({ mealPlan: mealPlan, error: null, message: "success" });
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
      { _id: req.body._id || new Types.ObjectId() },
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

export const httpAddMealToMealPlan = async (req: Request<{}, {}, IMealPlan>, res: Response) => {
  try {
    const mealPlan = await MealPlan.findOne(
      { _id: req.body._id },
    );
    console.log({ currentMeals: mealPlan!.meals, newMeals: req.body.meals })
    const meals = [...mealPlan!.meals, ...req.body.meals];
    const mealPlanUpdated = await MealPlan.findOneAndUpdate({ _id: req.body._id }, { meals }, { new: true });
    res.status(201).json({ mealPlan: mealPlanUpdated, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({ mealPlan: null, error, message: "error" });
  }
};
