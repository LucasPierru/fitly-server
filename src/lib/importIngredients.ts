import foundationDownload from "../data/foundationDownload.json";
import srDownload from "../data/FoodData_Central_sr_legacy_food_json_2021-10-28.json";
import {
  FoundationDownload,
  FoundationFood,
  UnitName,
} from "../types/data/foundationFood.types";
import { SRLegacy, SRLegacyFood } from "../types/data/srLegacyFood.types";
import { httpCreateIngredientCategory } from "../routes/ingredient-category/ingredient-category.controller";
import IngredientCategory from "../models/ingredientCategories.mongo";
import Ingredient from "../models/ingredients.mongo";
import { createIngredientCategory } from "../services/ingredient-categories/create-category";
import { createIngredients } from "../services/ingredients/create-ingredients";
import { Nutrient } from "../types/ingredients.types";
import { convertGramsToUnit } from "./utils";

const calculateCalories = (food: FoundationFood | SRLegacyFood) => {
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

  const alternateUnitsSet = new Set();
  const alternateUnits = srFoods.map((food) =>
    food.foodPortions.flatMap((portion) =>
      alternateUnitsSet.add(portion.modifier)
    )
  );

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

      const ingredientCategory = await createIngredientCategory(
        food.foodCategory.description
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
        amount: 100,
        unit: "grams",
        unitShort: "g",
        estimatedCost: {
          value: 0,
          unit: "USD",
        },
        image: "",
        nutrients: food.foodNutrients
          .filter((nutrient) =>
            nutrientSelection.includes(nutrient.nutrient.name)
          )
          .map((nutrient) => {
            return {
              name: nutrient.nutrient.name,
              amount: nutrient.amount!,
              unit: nutrient.nutrient.unitName,
            };
          }),
      };
    })
  );
  const srIngredients = await Promise.all(
    srFoods.map(async (food) => {
      let energyNutrients: Nutrient | null = null;
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

      const ingredientCategory = await createIngredientCategory(
        food.foodCategory.description
      );

      return {
        usdaId: food.fdcId,
        name: food.description,
        dataSource: "Foundation",
        category: ingredientCategory._id,
        alternateUnits: food.foodPortions.map((portion) => {
          const amount = portion.amount
            ? portion.amount
            : convertGramsToUnit(portion.modifier, portion.gramWeight);
          const unit =
            portion.measureUnit.name !== "undetermined"
              ? portion.measureUnit.name
              : portion.modifier;
          return {
            amount: amount,
            unit: unit,
            gramWeight: portion.gramWeight,
          };
        }),
        amount: 100,
        unit: "grams",
        unitShort: "g",
        estimatedCost: {
          value: 0,
          unit: "USD",
        },
        image: "",
        nutrients: food.foodNutrients
          .filter((nutrient) =>
            nutrientSelection.includes(nutrient.nutrient.name)
          )
          .map((nutrient) => {
            return {
              name: nutrient.nutrient.name,
              amount: nutrient.amount!,
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

  const newIngredients = await createIngredients(ingredients);
  const newIngredientsSR = await createIngredients(srIngredients);
  return newIngredients;
};
