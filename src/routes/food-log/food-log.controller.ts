import { Request, Response } from "express";
import FoodLog from "../../models/foodLogs.mongo";
import { IFoodLog } from "../../types/foodLogs.types";

export const httpGetFoodLogs = async (req: Request, res: Response) => {
  try {
    const foodLogs = await FoodLog.find({ userId: req.user!.id });
    res.status(200).json({ foodLogs });
  } catch (error) {
    res.status(500).json({
      message: `Cannot access user's food logs ${req.params.id}`,
      error,
    });
  }
};

export const httpCreateFoodLog = async (
  req: Request<{}, {}, IFoodLog>,
  res: Response
) => {
  try {
    const newFoodLog = new FoodLog({
      ...req.body,
      userId: req.user!.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const foodLog = await newFoodLog.save();
    res.status(201).json({ foodLog, message: "Food log created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Food log creation failed", error });
  }
};
