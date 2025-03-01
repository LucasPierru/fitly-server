import foundationDownload from "../data/foundationDownload.json";
import srDownload from "../data/FoodData_Central_sr_legacy_food_json_2021-10-28.json";
import {
  FoundationDownload,
  FoundationFood,
  UnitName,
} from "../types/data/foundationFood.types";
import { SRLegacy } from "../types/data/srLegacyFood.types";
import { httpCreateIngredientCategory } from "../routes/ingredient-category/ingredient-category.controller";
import IngredientCategory from "../models/ingredientCategories.mongo";
import Ingredient from "../models/ingredients.mongo";

const calculateCalories = (food: FoundationFood) => {
  if (
    !food.foodNutrients.find((nutrient) => nutrient.nutrient.name === "Energy")
  ) {
    const protein =
      food.foodNutrients.find(
        (nutrient) => nutrient.nutrient.name === "Protein"
      )?.amount || 0;
    const fat =
      food.foodNutrients.find(
        (nutrient) =>
          nutrient.nutrient.name === "Total lipid (fat)" ||
          nutrient.nutrient.name === "Total fat (NLEA)"
      )?.amount || 0;
    const carbs =
      (food.foodNutrients.find(
        (nutrient) => nutrient.nutrient.name === "Starch"
      )?.amount || 0) +
      (food.foodNutrients.find(
        (nutrient) => nutrient.nutrient.name === "Fiber, total dietary"
      )?.amount || 0) +
      (food.foodNutrients.find(
        (nutrient) =>
          nutrient.nutrient.name === "Sugars, Total" ||
          nutrient.nutrient.name === "Total Sugars"
      )?.amount || 0);
    const energy = parseFloat(((protein + carbs) * 4 + fat * 9).toFixed(2));
    return energy;
  }
  return 0;
};

export const importIngredients = async () => {
  const nutrientSelection = [
    "Water",
    "Total lipid (fat)",
    "Calcium, Ca",
    "Copper, Cu",
    "Iron, Fe",
    "Magnesium, Mg",
    "Potassium, K",
    "Sodium, Na",
    "Zinc, Zn",
    "Fiber, total dietary",
    "Protein",
    "Carbohydrate, by difference",
    "Sugars, Total",
    "Starch",
    "Energy",
    "Energy",
    "Total fat (NLEA)",
  ];
  const foundationFoods = (foundationDownload as FoundationDownload)
    .FoundationFoods;
  const srFoods = (srDownload as SRLegacy).SRLegacyFoods;

  const ingredients = await Promise.all(
    foundationFoods.map(async (food) => {
      let energyNutrients = null;
      if (
        !food.foodNutrients.find(
          (nutrient) => nutrient.nutrient.name === "Energy"
        )
      ) {
        energyNutrients = {
          name: "Energy",
          amount: calculateCalories(food),
          unit: "kcal" as UnitName,
        };
      }
      const nutrients = food.foodNutrients
        .filter((nutrient) =>
          nutrientSelection.includes(nutrient.nutrient.name)
        )
        .map((nutrient) => {
          return {
            name: nutrient.nutrient.name,
            amount: nutrient.amount,
            unit: nutrient.nutrient.unitName,
          };
        });
      if (energyNutrients) nutrients.push(energyNutrients);

      const ingredientCategory = await IngredientCategory.findOneAndUpdate(
        { name: food.foodCategory.description },
        {
          $set: { name: food.foodCategory.description, updatedAt: new Date() },
          $setOnInsert: { createdAt: new Date() },
        },
        { upsert: true, new: true }
      );

      return {
        usdaId: food.fdcId,
        name: food.description,
        dataSource: "Foundation",
        category: ingredientCategory._id,
        alternateUnits: food.foodPortions.map((portion) => {
          return {
            amount: portion.amount,
            unit: portion.measureUnit.name,
            gramWeight: portion.gramWeight,
          };
        }),
        nutrients: food.foodNutrients
          .filter((nutrient) =>
            nutrientSelection.includes(nutrient.nutrient.name)
          )
          .map((nutrient) => {
            return {
              name: nutrient.nutrient.name,
              amount: nutrient.amount,
              unit: nutrient.nutrient.unitName,
            };
          }),
      };
    })
  );
  const nutrientsSet = new Set();
  foundationFoods.map((ingredient) =>
    ingredient.foodNutrients.forEach((nutrient) =>
      nutrientsSet.add(nutrient.nutrient.name)
    )
  );
  const operations = ingredients.map((ingredient: any) => {
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

  const newIngredients = await Ingredient.bulkWrite(operations);
  //console.log({ ingredients });
  return newIngredients;
};
