import { Request, Response } from "express";
import Meal from "../../models/meals.mongo";
import { IMeal } from "../../types/meals.types";

export const httpGetMeal = async (req: Request, res: Response) => {
  try {
    const meal = await Meal.findById(req.params.id);
    res.status(200).json({ meal });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Cannot access meal ${req.params.id}`, error });
  }
};

export const httpGetMeals = async (req: Request, res: Response) => {
  try {
    const meals = await Meal.find({ userId: req.user!.id });
    res.status(200).json({ meals });
  } catch (error) {
    res.status(500).json({ message: "Cannot access meals", error });
  }
};

export const httpCreateMeal = async (
  req: Request<{}, {}, IMeal>,
  res: Response
) => {
  try {
    console.log({ meal: req.body });
    /* const newMeal = new Meal({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }); */
    /* const meal = await newMeal.save(); */
    res.status(201).json({ /* meal, */ message: "Meal created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Meal creation failed", error });
  }
};
