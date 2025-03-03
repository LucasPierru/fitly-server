import { Request, Response } from "express";
import FavoriteMeal from "../../models/favoriteMeals.mongo";
import { IFavoriteMeal } from "../../types/favoriteMeals.types";

export const httpGetFavoriteMeals = async (req: Request, res: Response) => {
  try {
    const favoriteMeals = await FavoriteMeal.find({ user: req.user!.id });
    res.status(200).json({ favoriteMeals, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({
      favoriteMeals: null,
      error,
      message: "error",
    });
  }
};

export const httpCreateFavoriteMeal = async (req: Request<{}, {}, IFavoriteMeal>, res: Response) => {
  try {
    const newFavoriteMeal = new FavoriteMeal({
      meal: req.body.meal,
      user: req.user!.id,
    });
    const favoriteMeal = await newFavoriteMeal.save();
    res.status(201).json({
      favoriteMeal,
      error: null,
      message: "success",
    });
  } catch (error) {
    res.status(400).json({
      favoriteMeal: null,
      error,
      message: "error",
    });
  }
};

export const httpDeleteFavoriteMeal = async (req: Request, res: Response) => {
  try {
    const deleteFavoriteMeal = await FavoriteMeal.findOneAndDelete({
      meal: req.params.mealId,
      user: req.user!.id,
    });
    res.status(201).json({
      deleteFavoriteMeal,
      error: null,
      message: "success",
    });
  } catch (error) {
    res.status(400).json({
      deleteFavoriteMeal: null,
      error,
      message: "error",
    });
  }
};
