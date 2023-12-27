import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDatabase() {
  const URI = process.env.MONGODB_URI;
  if (!URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }
  try {
    await mongoose.connect(URI);
    console.log("MongoDb connected for operation");
  } catch (error) {
    console.error(error);
  }
}

export async function disconnectDatabase() {
  try {
    await mongoose.disconnect();
    console.log("MongoDb disconnected");
  } catch (error) {
    console.error(error);
  }
}
