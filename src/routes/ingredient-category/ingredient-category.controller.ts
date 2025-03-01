import { Request, Response } from "express";
import IngredientCategory from "../../models/ingredientCategories.mongo";

export const httpGetCategory = async (req: Request, res: Response) => {
  try {
    const ingredientCategory = await IngredientCategory.findById(req.params.id);
    res.status(200).json({ ingredientCategory });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Cannot access category ${req.params.id}`, error });
  }
};

export const httpCreateIngredientCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { newIngredientCategory } = req.body;
    const ingredientCategory = await IngredientCategory.findOneAndUpdate(
      { name: newIngredientCategory.name },
      {
        $set: { ...newIngredientCategory, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true, new: true }
    );
    res.status(200).json({ ingredientCategory });
  } catch (error) {
    res.status(500).json({ message: `Cannot create ingredients`, error });
  }
};
