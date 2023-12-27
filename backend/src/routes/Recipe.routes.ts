import { Router } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware";
import {
  createRecipeModel,
  getRecipeByIdModel,
  getRecipesModel,
  updateRecipeByIdModel,
} from "../controllers/Recipe.controller";

const router = Router();

router.route("/").post(authMiddleware, createRecipeModel).get(getRecipesModel);

router
  .route("/:id")
  .get(getRecipeByIdModel)
  .put(authMiddleware, updateRecipeByIdModel);

export default router;
