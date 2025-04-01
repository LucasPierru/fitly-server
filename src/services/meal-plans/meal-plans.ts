import { IMeal, IMealPlan } from "../../types";

export const removeMealFromPlan = (meals: IMealPlan["meals"], mealPlanMealId: string) => {
  return meals.filter(meal => meal._id.toString() !== mealPlanMealId);
}

export const addMealToPlan = (meals: IMealPlan["meals"], newMeals: IMealPlan["meals"]) => {
  return [...meals, ...newMeals];
}

export const getMealPlanMacros = (mealPlan: IMealPlan): { calories: number; protein: number; carbs: number; fat: number } => {
  const macrosMap = new Map();

  mealPlan?.meals.forEach(meal => {
    const { nutrition } = meal.meal as IMeal;
    const { day } = meal;
    if (macrosMap.get(day)) {
      const macros = macrosMap.get(day);
      macrosMap.set(day, {
        calories: macros.calories + nutrition.calories,
        protein: macros.protein + nutrition.protein,
        carbs: macros.carbs + nutrition.carbs,
        fat: macros.fat + nutrition.fat,
      });
    } else {
      macrosMap.set(day, {
        calories: nutrition.calories,
        protein: nutrition.protein,
        carbs: nutrition.carbs,
        fat: nutrition.fat,
      });
    }
  })

  return Object.fromEntries(macrosMap);
}