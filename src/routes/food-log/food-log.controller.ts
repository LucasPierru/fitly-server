import { Request, Response } from "express";
import FoodLog from "../../models/foodLogs.mongo";
import { IFoodLog } from "../../types/foodLogs.types";

export const httpGetFoodLogs = async (req: Request, res: Response) => {
  try {
    const foodLogs = await FoodLog.find({ user: req.user!.id });
    res.status(200).json({ foodLogs, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({
      foodLogs: null,
      error,
      message: "error",
    });
  }
};

export const httpCreateFoodLog = async (req: Request<{}, {}, IFoodLog>, res: Response) => {
  try {
    const newFoodLog = new FoodLog({
      ...req.body,
      user: req.user!.id,
    });
    const foodLog = await newFoodLog.save();
    res.status(201).json({ foodLog, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({ foodLog: null, error, message: "error" });
  }
};

export const httpUpdateFoodLog = async (req: Request<{}, {}, IFoodLog>, res: Response) => {
  try {
    const foodLog = await FoodLog.findOneAndUpdate(
      { _id: req.body._id },
      {
        ...req.body,
      }
    );
    res.status(201).json({ foodLog, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({ foodLog: null, error, message: "error" });
  }
};

export const httpDeleteFoodLog = async (req: Request, res: Response) => {
  try {
    const foodLogDeleted = await FoodLog.findOneAndDelete({
      _id: req.params.foodLogId,
    });
    res.status(201).json({ foodLogDeleted, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({
      foodLogDeleted: null,
      error,
      message: "error",
    });
  }
};
