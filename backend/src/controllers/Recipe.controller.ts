import expressAsyncHandler from "express-async-handler";
import { IMiddleware } from "../interfaces/IMiddleware";
import { IUser } from "../interfaces/IUser";
import {
  createRecipe,
  deleteRecipe,
  getRecipeById,
  getRecipes,
  updateRecipe,
} from "../functions/Recipe.fuction";
import {
  ErrorRequestHandler,
  ServerErrorRequestHandler,
  SuccessRequestHandler,
} from "../helpers/Request";
import { Request, Response } from "express";

export const createRecipeModel = expressAsyncHandler(
  async (req: IMiddleware, res: Response) => {
    try {
      const user = req.user as IUser;
      if (user && user._id) {
        const recipeObj = await createRecipe(user._id, req.body);
        recipeObj && recipeObj._id
          ? SuccessRequestHandler(res, "Recipe Created", recipeObj)
          : ErrorRequestHandler(res, "Recipe Not Created");
      } else {
        ErrorRequestHandler(res, "User Not Found");
      }
    } catch (error) {
      ServerErrorRequestHandler(res, error);
      throw new Error(JSON.stringify(error));
    }
  }
);

export const getRecipesModel = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { search, page, limit } = req.query;
      const recipes = await getRecipes(
        Number(page),
        Number(limit),
        String(search)
      );
      recipes && recipes.length > 0
        ? SuccessRequestHandler(res, "Recipes Found", recipes)
        : ErrorRequestHandler(res, "Recipes Not Found");
    } catch (error) {
      ServerErrorRequestHandler(res, error);
      throw new Error(JSON.stringify(error));
    }
  }
);

export const getRecipeByIdModel = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const recipe = await getRecipeById(id);
      recipe
        ? SuccessRequestHandler(res, "Recipe Found", recipe)
        : ErrorRequestHandler(res, "Recipe Not Found");
    } catch (error) {
      ServerErrorRequestHandler(res, error);
    }
  }
);

export const updateRecipeByIdModel = expressAsyncHandler(
  async (req: IMiddleware, res: Response) => {
    try {
      const user = req.user as IUser;
      const { id } = req.params;
      const recipeObj = await updateRecipe(id, req.body);
      recipeObj && recipeObj._id
        ? SuccessRequestHandler(res, "Recipe Updated", recipeObj)
        : ErrorRequestHandler(res, "Recipe Not Updated");
    } catch (error) {
      ServerErrorRequestHandler(res, error);
    }
  }
);

export const deleteRecipeModel = expressAsyncHandler(
  async (req: IMiddleware, res: Response) => {
    try {
      const user = req.user as IUser;
      const { id } = req.params;
      const recipeObj = await deleteRecipe(id, user._id);
      recipeObj
        ? SuccessRequestHandler(res, "Recipe Updated", recipeObj)
        : ErrorRequestHandler(res, "Recipe Not Updated");
    } catch (error) {
      ServerErrorRequestHandler(res, error);
    }
  }
);
