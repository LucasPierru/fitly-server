import { Request, Response } from "express";
import Ingredient from "../../models/ingredients.mongo";

export const httpGetIngredient = async (req: Request, res: Response) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    res.status(200).json({ ingredient, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ ingredient: null, error, message: "error" });
  }
};

export const httpSearchIngredient = async (req: Request, res: Response) => {
  const { search, category, nutrientFilters } = req.query;

  const query: any = {};

  if (search) {
    query.$text = { $search: search as string };
  }

  if (category) {
    query.category = category;
  }

  /* if(nutrientFilters && nutrientFilters.length > 0) {
    query.nutrients = {};
  } */

  try {
    const ingredients = await Ingredient.find(query)
      .limit(5)
      .populate("category");
    res.status(200).json({ ingredients, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ ingredients: null, error, message: "error" });
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
    res.status(200).json({ ingredients, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ ingredients: null, error, message: "error" });
  }
};
