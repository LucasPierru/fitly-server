import { Request, Response } from "express";
import Ingredient from "../../models/ingredients.mongo";
import { IIngredient } from "../../types/ingredients.types";

export const httpGetIngredient = async (req: Request, res: Response) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    res.status(200).json({ ingredient });
  } catch (error) {
    res.status(500).json({
      message: `Cannot access the ingredient ${req.params.id}`,
      error,
    });
  }
};
