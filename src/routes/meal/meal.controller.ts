import { Request, Response } from "express";
import { ObjectId, startSession, Types } from "mongoose";
import { IMeal } from "../../types/meals.types";
import Meal from "../../models/meals.mongo";
import UserMeal from "../../models/userMeals.mongo";
import { uploadFile } from "../../services/storage/storage";

export const httpGetMeal = async (req: Request, res: Response) => {
  try {
    const meal = await Meal.findById(req.params.id);
    res.status(200).json({ meal, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ meal: null, error, message: "error" });
  }
};

export const httpGetMeals = async (req: Request, res: Response) => {
  try {
    const meals = await Meal.aggregate([
      {
        $match: {
          $or: [
            { isPublic: true },
            { creator: req.user!.id }
          ]
        }
      },
      {
        $unionWith: {
          coll: 'userMeals',
          pipeline: [
            { $match: { user: req.user!.id } },
            {
              $lookup: {
                from: 'meals',
                localField: 'meal',
                foreignField: '_id',
                as: 'mealDetails'
              }
            },
            { $unwind: "$mealDetails" },
            { $replaceRoot: { newRoot: "$mealDetails" } }
          ]
        }
      }
    ]);
    const newMeals = meals.map(meal => ({ ...meal, isOwner: meal.creator.toString() === req.user?.id?.toString() }));
    console.log({ newMeals, meals })
    res.status(200).json({ meals: newMeals, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ meals: null, error, message: "error" });
  }
};

export const httpGetUserMeals = async (req: Request, res: Response) => {
  try {
    const userMeals = await UserMeal.find({ user: req.user!.id }).select("meal").populate({ path: "meal" });
    const meals = userMeals.map((userMeal) => userMeal.meal);
    res.status(200).json({ meals, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({ meals: null, error, message: "error" });
  }
};

export const httpCreateMeal = async (req: Request<{}, {}, IMeal & { image: { data: string; name: string, type: string } }>, res: Response) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const meal = await Meal.findOneAndUpdate(
      { _id: req.body._id || new Types.ObjectId() },
      {
        $set: { ...req.body, image: req.body.image.name },
        $setOnInsert: { creator: req.user!.id },
      },
      { upsert: true, new: true, session, includeResultMetadata: false }
    );
    if (meal && !meal.errors) {
      const imageUrl = await uploadFile("fitly-meals", meal._id, req.body.image);
      console.log({ imageUrl })
      const userMeal = await UserMeal.create([{ meal: meal._id, user: req.user!.id }], { session });
    }
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ meal, error: null, message: "success" });
  } catch (error) {
    console.log({ error })
    await session.abortTransaction(); // Rollback changes on failure
    session.endSession();
    res.status(400).json({ meal: null, error, message: "error" });
  }
};

export const httpAddMeal = async (req: Request<{}, {}, IMeal>, res: Response) => {
  try {
    const userMeal = await UserMeal.create({
      meal: req.body._id,
      user: req.user!.id,
    });
    res.status(201).json({ userMeal, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({ userMeal: null, error, message: "error" });
  }
};
