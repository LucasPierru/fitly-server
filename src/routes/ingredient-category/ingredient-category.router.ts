import express from "express";
import { httpCreateIngredientCategory, httpGetCategories, httpGetCategory } from "./ingredient-category.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const ingredientCategoryRouter = express.Router();

ingredientCategoryRouter.get("/details/:id", passportMiddleware, httpGetCategory);
ingredientCategoryRouter.get("/list", passportMiddleware, httpGetCategories);
ingredientCategoryRouter.get("/create", passportMiddleware, httpCreateIngredientCategory);

export default ingredientCategoryRouter;
