import express from "express";
import { httpCreateFoodLog, httpDeleteFoodLog, httpGetFoodLogs, httpUpdateFoodLog } from "./food-log.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const foodLogRouter = express.Router();

foodLogRouter.get("/all", httpGetFoodLogs);
foodLogRouter.post("/create", passportMiddleware, httpCreateFoodLog);
foodLogRouter.post("/update", passportMiddleware, httpUpdateFoodLog);
foodLogRouter.delete("/delete/:foodLogId", passportMiddleware, httpDeleteFoodLog);

export default foodLogRouter;
