import expressAsyncHandler from "express-async-handler";
import { IMiddleware } from "../interfaces/IMiddleware";
import { IUser } from "../interfaces/IUser";
import {
  createRecipe,
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
import { connectDatabase, disconnectDatabase } from "../config/mongo";

export const createRecipeModel = expressAsyncHandler(
  async (req: IMiddleware, res: Response) => {
    try {
      const user = req.user as IUser;
      if (user && user._id) {
        await connectDatabase();
        const recipeObj = await createRecipe(user._id, req.body);
        recipeObj && recipeObj._id
          ? SuccessRequestHandler(res, "Recipe Created", recipeObj)
          : ErrorRequestHandler(res, "Recipe Not Created");
        await disconnectDatabase();
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
      const { page, limit, search } = req.query;
      await connectDatabase();
      const recipes = await getRecipes(
        Number(page),
        Number(limit),
        search as string
      );
      recipes && recipes.length > 0
        ? SuccessRequestHandler(res, "Recipes Found", recipes)
        : ErrorRequestHandler(res, "Recipes Not Found");
      await disconnectDatabase();
    } catch (error) {
      ServerErrorRequestHandler(res, error);
    }
  }
);

export const getRecipeByIdModel = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await connectDatabase();
      const recipe = await getRecipeById(id);
      recipe
        ? SuccessRequestHandler(res, "Recipe Found", recipe)
        : ErrorRequestHandler(res, "Recipe Not Found");
      await disconnectDatabase();
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
      await connectDatabase();
      const recipeObj = await updateRecipe(id, req.body);
      recipeObj && recipeObj._id
        ? SuccessRequestHandler(res, "Recipe Updated", recipeObj)
        : ErrorRequestHandler(res, "Recipe Not Updated");
      await disconnectDatabase();
    } catch (error) {
      ServerErrorRequestHandler(res, error);
    }
  }
);
