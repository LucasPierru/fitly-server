import { Request, Response } from "express";
import MealPlan from "../../models/mealPlans.mongo";
import { IMealPlan } from "../../types/mealPlans.types";
import { Types } from "mongoose";
import SavedMealPlan from "../../models/savedMealPlans.mongo";
import { addMealToPlan, getMealPlanMacros, removeMealFromPlan } from "../../services/meal-plans/meal-plans";
import { IMeal, ISavedMealPlan } from "../../types";

export const httpGetMealPlan = async (req: Request, res: Response) => {
  const day = req.query.day;
  try {
    const mealPlan = await MealPlan.findOne({ user: req.user!.id })
      .populate({
        path: 'meals.meal', // Populate the 'meal' reference in the 'meals' array
        model: 'Meal',
      })
      .then(mealPlan => {
        // Filter meals based on the day query param
        if (mealPlan) {
          const filteredMeals = mealPlan.meals.filter(meal => meal.day === day);
          mealPlan.meals = filteredMeals; // Update meals with the filtered list
        }
        return mealPlan;
      });
    const macros = getMealPlanMacros(mealPlan!);
    res.status(200).json({ mealPlan: { ...mealPlan?.toObject(), macros }, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ mealPlan: null, error, message: "error" });
  }
};

export const httpGetMealPlans = async (req: Request, res: Response) => {
  try {
    const mealPlans = await MealPlan.find({ user: req.user!.id }).populate("meals.meal");
    res.status(200).json({ mealPlans, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ mealPlans: null, error, message: "error" });
  }
};

export const httpCreateMealPlan = async (req: Request<{}, {}, IMealPlan>, res: Response) => {
  try {
    const mealPlan = await MealPlan.findOneAndUpdate(
      { _id: req.body._id || new Types.ObjectId() },
      {
        $set: req.body,
        $setOnInsert: { user: req.user!.id },
      },
      { upsert: true, new: true }
    );
    res.status(201).json({ mealPlan, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({ mealPlan: null, error, message: "error" });
  }
};

export const httpAddMealToMealPlan = async (req: Request<{}, {}, IMealPlan>, res: Response) => {
  try {
    const mealPlan = await MealPlan.findOne(
      { user: req.user!.id },
    );
    const meals = addMealToPlan(mealPlan!.meals, req.body.meals);
    const mealPlanUpdated = await MealPlan.findOneAndUpdate({ user: req.user!.id }, { meals }, { new: true });
    res.status(201).json({ mealPlan: mealPlanUpdated, error: null, message: "success" });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ mealPlan: null, error, message: "error" });
  }
};

export const httpRemoveMealFromMealPlan = async (req: Request<{}, {}, {
  mealPlanMealId: string;
}>, res: Response) => {
  const { mealPlanMealId } = req.body;

  try {
    const mealPlan = await MealPlan.findOne(
      { user: req.user!.id },
    );
    const meals = removeMealFromPlan(mealPlan!.meals, mealPlanMealId)
    const mealPlanUpdated = await MealPlan.findOneAndUpdate({ user: req.user!.id }, { meals }, { new: true });
    res.status(201).json({ mealPlan: mealPlanUpdated, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({ mealPlan: null, error, message: "error" });
  }
};

//Saved meal plans

export const httpCreateSavedMealPlan = async (req: Request<{}, {}, ISavedMealPlan>, res: Response) => {
  try {
    const savedMealPlan = await SavedMealPlan.findOneAndUpdate(
      { _id: req.body._id || new Types.ObjectId() },
      {
        $set: req.body,
        $setOnInsert: { user: req.user!.id },
      },
      { upsert: true, new: true }
    );
    res.status(201).json({ savedMealPlan, error: null, message: "success" });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ savedMealPlan: null, error, message: "error" });
  }
};

export const httpGetSavedMealPlan = async (req: Request, res: Response) => {
  const day = req.query.day;
  try {
    const savedMealPlan = await SavedMealPlan.findById(req.params.id)
      .populate({
        path: 'meals.meal', // Populate the 'meal' reference in the 'meals' array
        model: 'Meal',
      })
      .then(mealPlan => {
        // Filter meals based on the day query param
        if (mealPlan) {
          const filteredMeals = mealPlan.meals.filter(meal => meal.day === day);
          mealPlan.meals = filteredMeals; // Update meals with the filtered list
        }
        return mealPlan;
      });
    const macros = getMealPlanMacros(savedMealPlan!);

    res.status(200).json({ savedMealPlan: { ...savedMealPlan?.toObject(), macros }, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ savedMealPlan: null, error, message: "error" });
  }
};

export const httpGetSavedMealPlanMetadata = async (req: Request, res: Response) => {
  try {
    const mealPlan = await SavedMealPlan.findById(req.params.id).populate({
      path: 'meals.meal', // Populate the 'meal' reference in the 'meals' array
      model: 'Meal',
    })

    const macrosMap = new Map();
    let newMealPlan;

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
      newMealPlan = { ...mealPlan.toObject(), macros: Object.fromEntries(macrosMap) };
    })
    res.status(200).json({ savedMealPlan: newMealPlan, error: null, message: "success" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ savedMealPlan: null, error, message: "error" });
  }
};

export const httpGetSavedMealPlans = async (req: Request, res: Response) => {
  try {
    const savedMealPlans = await SavedMealPlan.find({ user: req.user!.id }).populate("meals.meal");
    res.status(200).json({ savedMealPlans, error: null, message: "success" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ savedMealPlans: null, error, message: "error" });
  }
};

export const httpAddMealToSavedMealPlan = async (req: Request<{}, {}, ISavedMealPlan>, res: Response) => {
  try {
    const mealPlan = await SavedMealPlan.findOne(
      { _id: req.body._id },
    );
    const meals = addMealToPlan(mealPlan!.meals, req.body.meals);
    const mealPlanUpdated = await MealPlan.findOneAndUpdate({ _id: req.body._id }, { meals }, { new: true });
    res.status(201).json({ savedMealPlan: mealPlanUpdated, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({ savedMealPlan: null, error, message: "error" });
  }
};

export const httpRemoveMealFromSavedMealPlan = async (req: Request<{}, {}, {
  mealPlanId: string;
  mealPlanMealId: string;
}>, res: Response) => {
  const { mealPlanId, mealPlanMealId } = req.body;


  try {
    console.log({ mealPlanId, mealPlanMealId });
    const mealPlan = await MealPlan.findOne(
      { _id: mealPlanId },
    );
    const meals = removeMealFromPlan(mealPlan!.meals, mealPlanMealId)
    const mealPlanUpdated = await SavedMealPlan.findOneAndUpdate({ _id: mealPlanId }, { meals }, { new: true });
    res.status(201).json({ savedMealPlan: mealPlanUpdated, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({ savedMealPlan: null, error, message: "error" });
  }
};
