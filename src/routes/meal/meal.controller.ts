import { Request, Response } from "express";
import { startSession } from "mongoose";
import { IMeal } from "../../types/meals.types";
import Meal from "../../models/meals.mongo";
import UserMeal from "../../models/userMeals.mongo";

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
    const userMeals = await UserMeal.find({ user: req.user!.id }).select("meal");
    const mealIds = userMeals.map((userMeal) => userMeal.meal);
    const meals = await Meal.find({ _id: { $nin: mealIds } });
    res.status(200).json({ meals, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ meals: null, error, message: "error" });
  }
};

export const httpGetUserMeals = async (req: Request, res: Response) => {
  try {
    const userMeals = await UserMeal.find({ user: req.user!.id }).select("meal").populate("meal");
    const meals = userMeals.map((userMeal) => userMeal.meal);
    res.status(200).json({ meals, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ meals: null, error, message: "error" });
  }
};

export const httpCreateMeal = async (req: Request<{}, {}, IMeal>, res: Response) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const meal = await Meal.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: req.body,
        $setOnInsert: { creator: req.user!.id },
      },
      { upsert: true, new: true, session, includeResultMetadata: true }
    );
    if (meal.value && !meal.lastErrorObject?.updatedExisting) {
      const userMeal = await UserMeal.create({ meal: meal.value._id, user: req.user!.id }, { session });
    }
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ meal: meal.value, error: null, message: "success" });
  } catch (error) {
    await session.abortTransaction(); // Rollback changes on failure
    session.endSession();
    res.status(400).json({ meal: null, error, message: "error" });
  }
};

export const httpAddMeal = async (req: Request<{}, {}, IMeal>, res: Response) => {
  try {
    const userMeal = await UserMeal.create({
      meal: req.body._id,
      user: req.user!.id,
    });
    res.status(201).json({ userMeal, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({ userMeal: null, error, message: "error" });
  }
};
