import { Request, Response } from "express";
import FoodLog from "../../models/foodLogs.mongo";
import { IFoodLog } from "../../types/foodLogs.types";

export const httpGetFoodLogs = async (req: Request, res: Response) => {
  try {
    const foodLogs = await FoodLog.find({ userId: req.user!.id });
    res.status(200).json({ foodLogs });
  } catch (error) {
    res.status(500).json({
      message: `Cannot access user's food logs`,
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

export const httpUpdateFoodLog = async (
  req: Request<{}, {}, IFoodLog>,
  res: Response
) => {
  try {
    const foodLog = await FoodLog.findOneAndUpdate(
      { _id: req.body._id },
      {
        ...req.body,
        updatedAt: new Date(),
      }
    );
    res.status(201).json({ foodLog, message: "Food log updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Food log update failed", error });
  }
};

export const httpDeleteFoodLog = async (req: Request, res: Response) => {
  try {
    const foodLogDeleted = await FoodLog.findOneAndDelete({
      _id: req.params.foodLogId,
    });
    res
      .status(201)
      .json({ foodLogDeleted, message: "Food log deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Food log deletion failed", error });
  }
};
