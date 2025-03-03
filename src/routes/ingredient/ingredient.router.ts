import express from "express";
import {
  httpCreateIngredients,
  httpGetIngredient,
  httpSearchIngredient,
} from "./ingredient.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const ingredientRouter = express.Router();

ingredientRouter.get("/details/:id", passportMiddleware, httpGetIngredient);
ingredientRouter.get("/search", passportMiddleware, httpSearchIngredient);
ingredientRouter.get("/create-many", passportMiddleware, httpCreateIngredients);

export default ingredientRouter;
