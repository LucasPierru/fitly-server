import { Request, Response } from "express";
import FavoriteMeal from "../../models/favoriteMeals.mongo";
import { IFavoriteMeal } from "../../types/favoriteMeals.types";

export const httpGetFavoriteMeals = async (req: Request, res: Response) => {
  try {
    const favoriteMeals = await FavoriteMeal.find({ user: req.user!.id });
    res.status(200).json({ favoriteMeals });
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
      meal: req.body.meal,
      user: req.user!.id,
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

export const httpDeleteFavoriteMeal = async (req: Request, res: Response) => {
  try {
    const deleteFavoriteMeal = await FavoriteMeal.findOneAndDelete({
      meal: req.params.mealId,
      user: req.user!.id,
    });
    res.status(201).json({
      deleteFavoriteMeal,
      message: "Favorite meal deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: "Favorite meal deletion failed", error });
  }
};
