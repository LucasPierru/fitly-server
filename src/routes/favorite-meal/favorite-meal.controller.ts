import { Request, Response } from "express";
import FavoriteMeal from "../../models/favoriteMeals.mongo";
import { IFavoriteMeal } from "../../types/favoriteMeals.types";

export const httpGetFavoriteMeals = async (req: Request, res: Response) => {
  try {
    const foodLogs = await FavoriteMeal.find({ userId: req.user!.id });
    res.status(200).json({ foodLogs });
  } catch (error) {
    res.status(500).json({
      message: `Cannot access user's favorite meals`,
      error,
    });
  }
};

export const httpCreateFavoriteMeal = async (
  req: Request<{}, {}, IFavoriteMeal>,
  res: Response
) => {
  try {
    const newFavoriteMeal = new FavoriteMeal({
      mealId: req.body.mealId,
      userId: req.user!.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const favoriteMeal = await newFavoriteMeal.save();
    res
      .status(201)
      .json({ favoriteMeal, message: "Favorite meal created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Favorite meal creation failed", error });
  }
};
