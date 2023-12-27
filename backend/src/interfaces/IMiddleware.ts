import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IMiddleware extends Request {
  user?: JwtPayload;
}
