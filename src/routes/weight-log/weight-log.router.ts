import express from "express";
import {
  httpCreateWeightLog,
  httpGetWeightLogs,
} from "./weight-log.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const weightLogRouter = express.Router();

weightLogRouter.get("/all", httpGetWeightLogs);
weightLogRouter.post("/create", passportMiddleware, httpCreateWeightLog);

export default weightLogRouter;
