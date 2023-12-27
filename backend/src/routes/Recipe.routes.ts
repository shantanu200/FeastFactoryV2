import { Router } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware";
import {
  createRecipeModel,
  deleteRecipeModel,
  getRecipeByIdModel,
  getRecipesModel,
  updateRecipeByIdModel,
} from "../controllers/Recipe.controller";

const router = Router();

router.route("/").post(authMiddleware, createRecipeModel);

router.route("/posts").get(getRecipesModel);

router
  .route("/:id")
  .get(getRecipeByIdModel)
  .put(authMiddleware, updateRecipeByIdModel)
  .delete(authMiddleware, deleteRecipeModel);

export default router;
