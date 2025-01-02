import { Request, Response } from "express";
import MealPlan from "../../models/mealPlans.mongo";
import { IMealPlanInsert } from "../../types/mealPlans.types";
import { createMeals } from "../../services/meals";

export const httpGetMealPlan = async (req: Request, res: Response) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);
    res.status(200).json({ mealPlan });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Cannot access meal plan ${req.params.id}`, error });
  }
};

export const httpGetMealPlans = async (req: Request, res: Response) => {
  try {
    const mealPlans = await MealPlan.find({ userId: req.user!.id });
    res.status(200).json({ mealPlans });
  } catch (error) {
    res.status(500).json({ message: "Cannot access meal plans", error });
  }
};

export const httpCreateMealPlan = async (
  req: Request<{}, {}, IMealPlanInsert>,
  res: Response
) => {
  try {
    const { name, description, meals } = req.body;
    const newMeals = createMeals(meals);
    /* const newMealPlan = new MealPlan({
      name,
      description,
      newMeals,
      userId: req.user!.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const mealPlan = await newMealPlan.save(); */
    res.status(201).json({ message: "Meal plan created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Meal plan creation failed", error });
  }
};
