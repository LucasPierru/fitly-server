import foundationDownload from "../data/foundationDownload.json";
import srDownload from "../data/FoodData_Central_sr_legacy_food_json_2021-10-28.json";
import { FoundationDownload } from "../types/data/foundationFood.types";
import { SRLegacy } from "../types/data/srLegacyFood.types";

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
    "Energy",
    "Energy",
    "Total fat (NLEA)",
  ];
  const foundationFoods = (foundationDownload as FoundationDownload)
    .FoundationFoods;
  const srFoods = (srDownload as SRLegacy).SRLegacyFoods;

  const ingredients = foundationFoods.map((food) => {
    return {
      usdaId: food.fdcId,
      name: food.description,
      dataSource: "Foundation",
      category: food.foodCategory.description,
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
  });
  /* console.log({
    nutrients: foundationFoods.find(
      (food) => food.description === "Oil, olive, extra virgin"
    ),
  }); */
  console.log(ingredients);
  return ingredients;
};
