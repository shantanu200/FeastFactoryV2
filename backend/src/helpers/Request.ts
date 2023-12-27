import { Response } from "express";
import { disconnectDatabase } from "../config/mongo";

export function SuccessRequestHandler(
  res: Response,
  message: string,
  data: any
) {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
}

export function ErrorRequestHandler(res: Response, message: string) {
  return res.status(400).json({
    success: false,
    message,
  });
}

export async function ServerErrorRequestHandler(res: Response, error: any) {
  await disconnectDatabase();
  return res.status(500).json({
    success: false,
    message: "Server Request Failed",
    error,
  });
}
