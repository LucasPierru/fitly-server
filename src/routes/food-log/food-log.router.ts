import express from "express";
import { httpCreateFoodLog, httpGetFoodLogs } from "./food-log.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const foodLogRouter = express.Router();

foodLogRouter.get("/all", httpGetFoodLogs);
foodLogRouter.post("/create", passportMiddleware, httpCreateFoodLog);

export default foodLogRouter;
