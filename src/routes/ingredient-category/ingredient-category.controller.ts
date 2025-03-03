import { Request, Response } from "express";
import IngredientCategory from "../../models/ingredientCategories.mongo";

export const httpGetCategory = async (req: Request, res: Response) => {
  try {
    const ingredientCategory = await IngredientCategory.findById(req.params.id);
    res.status(200).json({ ingredientCategory, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ ingredientCategory: null, error, message: "error" });
  }
};

export const httpGetCategories = async (req: Request, res: Response) => {
  try {
    const ingredientCategories = await IngredientCategory.find();
    res.status(200).json({ ingredientCategories, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ ingredientCategories: null, error, message: "error" });
  }
};

export const httpCreateIngredientCategory = async (req: Request, res: Response) => {
  try {
    const { newIngredientCategory } = req.body;
    const ingredientCategory = await IngredientCategory.findOneAndUpdate(
      { name: newIngredientCategory.name },
      {
        $set: newIngredientCategory,
      },
      { upsert: true, new: true }
    );
    res.status(200).json({ ingredientCategory, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ ingredientCategory: null, error, message: "error" });
  }
};
