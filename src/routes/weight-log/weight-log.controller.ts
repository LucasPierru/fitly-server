import { Request, Response } from "express";
import WeightLog from "../../models/weightLogs.mongo";
import { IWeightLog } from "../../types/weightLogs.types";

export const httpGetWeightLogs = async (req: Request, res: Response) => {
  try {
    const weightLogs = await WeightLog.find({ userId: req.user!.id });
    res.status(200).json({ weightLogs });
  } catch (error) {
    res.status(500).json({
      message: `Cannot access user's weight logs ${req.params.id}`,
      error,
    });
  }
};

export const httpCreateWeightLog = async (
  req: Request<{}, {}, IWeightLog>,
  res: Response
) => {
  try {
    const newWeightLog = new WeightLog({
      ...req.body,
      userId: req.user!.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const weightLog = await newWeightLog.save();
    res
      .status(201)
      .json({ weightLog, message: "Weight log created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Weight log creation failed", error });
  }
};
