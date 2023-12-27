import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./routes/User.routes";
import RecipeRoutes from "./routes/Recipe.routes";
import { connectDatabase } from "./config/mongo";
dotenv.config();

const SERVER = express();

SERVER.use(cors());
SERVER.use(express.json());
SERVER.use(express.urlencoded({ extended: true }));

SERVER.use("/api/user", UserRoutes);
SERVER.use("/api/recipe", RecipeRoutes);

const PORT = process.env.PORT || 8080;

SERVER.listen(PORT, () => {
  connectDatabase();
  console.log(`Server listening on port ${PORT}`);
});
