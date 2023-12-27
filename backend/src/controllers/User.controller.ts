import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  createUser,
  getUserById,
  loginUser,
  updateUserById,
} from "../functions/User.function";
import {
  ErrorRequestHandler,
  ServerErrorRequestHandler,
  SuccessRequestHandler,
} from "../helpers/Request";
import { connectDatabase, disconnectDatabase } from "../config/mongo";
import { IMiddleware } from "../interfaces/IMiddleware";
import { IUser } from "../interfaces/IUser";

export const createUserModel = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      await connectDatabase();
      const userObj = await createUser(req.body);
      userObj && userObj._id
        ? SuccessRequestHandler(res, "User created", userObj)
        : ErrorRequestHandler(res, "User not created");
      await disconnectDatabase();
    } catch (error) {
      ServerErrorRequestHandler(res, JSON.stringify(error));
    }
  }
);

export const loginUserModel = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      await connectDatabase();
      const { username, password } = req.body;
      const userObj = await loginUser(username, password);

      userObj.success
        ? SuccessRequestHandler(res, userObj.message, userObj.data)
        : ErrorRequestHandler(res, userObj.message);
      await disconnectDatabase();
    } catch (error) {
      ServerErrorRequestHandler(res, error);
    }
  }
);

export const getUserByIdModel = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await connectDatabase();
      const userObj = await getUserById(id);
      userObj && userObj._id
        ? SuccessRequestHandler(res, "User found", userObj)
        : ErrorRequestHandler(res, "User not found");
      await disconnectDatabase();
    } catch (error) {
      ServerErrorRequestHandler(res, error);
    }
  }
);

export const updateUserByIdModel = expressAsyncHandler(
  async (req: IMiddleware, res: Response) => {
    try {
      const user = req.user as IUser;
      await connectDatabase();
      const userObj = await updateUserById(user._id, req.body);
      await disconnectDatabase();
      userObj && userObj._id
        ? SuccessRequestHandler(res, "User details Updated", {})
        : ErrorRequestHandler(res, "User details not updated");
    } catch (error) {
      ServerErrorRequestHandler(res, error);
    }
  }
);

export const getUserDetailsToken = expressAsyncHandler(
  async (req: IMiddleware, res: Response) => {
    try {
      const userObj = req.user as IUser;
      userObj && userObj._id
        ? SuccessRequestHandler(res, "User details found", userObj)
        : ErrorRequestHandler(res, "User details not found");
    } catch (error) {
      ServerErrorRequestHandler(res, error);
    }
  }
);


