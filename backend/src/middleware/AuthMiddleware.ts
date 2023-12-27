import { NextFunction, Response } from "express";
import { IMiddleware } from "../interfaces/IMiddleware";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { getUserById } from "../functions/User.function";
import { IUser } from "../interfaces/IUser";

export const authMiddleware = async (
  req: IMiddleware,
  res: Response,
  next: NextFunction
) => {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET not found in .env file");
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const user = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
        const data = await User.findById(user.id).populate("recipes");
        req.user = data as IUser;
        next();
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Authorization header not found",
    });
  }
};
