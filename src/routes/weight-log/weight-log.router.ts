import express from "express";
import {
  httpCreateWeightLog,
  httpGetWeightLogs,
  httpUpdateWeightLog,
  httpDeleteWeightLog,
} from "./weight-log.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const weightLogRouter = express.Router();

weightLogRouter.get("/all", httpGetWeightLogs);
weightLogRouter.post("/create", passportMiddleware, httpCreateWeightLog);
weightLogRouter.post("/update", passportMiddleware, httpUpdateWeightLog);
weightLogRouter.delete("/delete/:weightLogId", passportMiddleware, httpDeleteWeightLog);

export default weightLogRouter;
