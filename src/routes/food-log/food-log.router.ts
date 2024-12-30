import express from "express";
import { httpCreateFoodLog, httpGetFoodLogs } from "./food-log.controller";
import authMiddleware from "../../middleware/authMiddleware";

const foodLogRouter = express.Router();

foodLogRouter.get("/all", httpGetFoodLogs);
foodLogRouter.post("/create", authMiddleware, httpCreateFoodLog);

export default foodLogRouter;
