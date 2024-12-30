import express from "express";
import {
  httpCreateWeightLog,
  httpGetWeightLogs,
} from "./weight-log.controller";
import authMiddleware from "../../middleware/authMiddleware";

const weightLogRouter = express.Router();

weightLogRouter.get("/all", httpGetWeightLogs);
weightLogRouter.post("/create", authMiddleware, httpCreateWeightLog);

export default weightLogRouter;
