import express from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { httpGetIngredient } from "./ingredient.controller";

const ingredientRouter = express.Router();

ingredientRouter.get("/details/:id", authMiddleware, httpGetIngredient);

export default ingredientRouter;
