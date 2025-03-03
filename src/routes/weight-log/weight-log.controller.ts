import { Request, Response } from "express";
import WeightLog from "../../models/weightLogs.mongo";
import { IWeightLog } from "../../types/weightLogs.types";

export const httpGetWeightLogs = async (req: Request, res: Response) => {
  try {
    const weightLogs = await WeightLog.find({ user: req.user!.id });
    res.status(200).json({ weightLogs, error: null, message: "success" });
  } catch (error) {
    res.status(500).json({
      weightLogs: null,
      error,
      message: "error",
    });
  }
};

export const httpCreateWeightLog = async (req: Request<{}, {}, IWeightLog>, res: Response) => {
  try {
    const newWeightLog = new WeightLog({
      ...req.body,
      user: req.user!.id,
    });
    const weightLog = await newWeightLog.save();
    res.status(201).json({ weightLog, message: "Weight log created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Weight log creation failed", error });
  }
};

export const httpUpdateWeightLog = async (req: Request<{}, {}, IWeightLog>, res: Response) => {
  try {
    const weightLog = await WeightLog.findOneAndUpdate(
      { _id: req.body._id },
      {
        ...req.body,
      }
    );
    res.status(201).json({ weightLog, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({ weightLog: null, error, message: "error" });
  }
};

export const httpDeleteWeightLog = async (req: Request, res: Response) => {
  try {
    const weightLogDeleted = await WeightLog.findOneAndDelete({
      _id: req.params.weightLogId,
    });
    res.status(201).json({ weightLogDeleted, error: null, message: "success" });
  } catch (error) {
    res.status(400).json({
      weightLogDeleted: null,
      error,
      message: "error",
    });
  }
};
