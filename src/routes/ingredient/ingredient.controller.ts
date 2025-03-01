import { Request, Response } from "express";
import Ingredient from "../../models/ingredients.mongo";

export const httpGetIngredient = async (req: Request, res: Response) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    res.status(200).json({ ingredient });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Cannot access ingredient ${req.params.id}`, error });
  }
};

export const httpCreateIngredients = async (req: Request, res: Response) => {
  try {
    const { newIngredients } = req.body;
    const operations = newIngredients.map((ingredient: any) => {
      return {
        updateOne: {
          filter: { name: ingredient.name },
          update: {
            $set: { ...ingredient, updatedAt: new Date() },
            $setOnInsert: { createdAt: new Date() },
          },
          upsert: true,
        },
      };
    });

    const ingredients = await Ingredient.bulkWrite(operations);
    res.status(200).json({ ingredients });
  } catch (error) {
    res.status(500).json({ message: `Cannot create ingredients`, error });
  }
};
