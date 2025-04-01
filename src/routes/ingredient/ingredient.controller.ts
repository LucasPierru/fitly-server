import { Request, Response } from "express";
import Ingredient from "../../models/ingredients.mongo";
import { Nutrient } from "../../types/ingredients.types";

export const httpGetIngredient = async (req: Request, res: Response) => {
  const { amount, unit } = req.query;
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      res.status(404).json({ ingredient: null, error: "Ingredient not found", message: "error" });
    }
    if (unit === "g" && amount === "100") {
      res.status(200).json({ ingredient, error: null, message: "success" });
      return;
    }
    if ((unit === "g" || !unit) && amount) {
      const nutrients: Nutrient[] = [];
      const currentIngredient = ingredient!.toObject();
      const factor = Number(amount) / currentIngredient.amount;
      currentIngredient.nutrients.forEach((nutrient: Nutrient) => { nutrients.push({ ...nutrient, amount: nutrient.amount * factor }) });
      const normalizedIngredient = { ...currentIngredient, nutrients, amount: currentIngredient.amount * factor, estimatedCost: { value: currentIngredient.estimatedCost.value * factor, unit: currentIngredient.estimatedCost.unit } };
      res.status(200).json({ ingredient: normalizedIngredient, error: null, message: "success" });
      return;
    } else {
      const nutrients: Nutrient[] = [];
      const currentIngredient = ingredient!.toObject();
      const alternateUnit = currentIngredient.alternateUnits.find((altUnit) => altUnit.unit === unit);
      if (!alternateUnit) {
        res.status(400).json({ ingredient: null, error: "Invalid unit", message: "error" });
        return;
      }
      const factor = (Number(amount) / alternateUnit.amount) * (alternateUnit.gramWeight / currentIngredient.amount);
      currentIngredient.nutrients.forEach((nutrient: Nutrient) => { nutrients.push({ ...nutrient, amount: nutrient.amount * factor }) });
      const normalizedIngredient = { ...currentIngredient, nutrients, amount: currentIngredient.amount * factor, estimatedCost: { value: currentIngredient.estimatedCost.value * factor, unit: currentIngredient.estimatedCost.unit } };
      res.status(200).json({ ingredient: normalizedIngredient, error: null, message: "success" });
      return;
    }
  } catch (error) {
    res.status(500).json({ ingredient: null, error, message: "error" });
  }
};

export const httpSearchIngredient = async (req: Request, res: Response) => {
  const { search, category, nutrientFilters } = req.query;

  const query: any = {};

  if (search) {
    query.$text = { $search: search as string };
    /* query.name = { $regex: search } */
  }

  if (category) {
    query.category = category;
  }

  /* if(nutrientFilters && nutrientFilters.length > 0) {
    query.nutrients = {};
  } */

  const pipeline = [
    {
      $search: {
        index: "default", // Replace with your Atlas Search index name
        text: {
          query: search,
          path: ["name"], // Fields to search in
          fuzzy: { maxEdits: 2 }, // Enable typo tolerance
        },
      },
    },
    { $limit: 10 }, // Limit results to 10
    { $project: { _id: 1, name: 1, score: { $meta: "searchScore" } } }, // Include search score
  ];

  try {
    const ingredients = await Ingredient.aggregate(pipeline);
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
            $set: ingredient,
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
