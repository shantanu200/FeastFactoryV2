import mongoose from "mongoose";
import { IRecipe } from "../interfaces/IRecipe";

const RecipeSchema = new mongoose.Schema<IRecipe>(
  {
    name: { type: String, required: [true, "Recipe Name required"] },
    description: {
      type: String,
      required: [true, "Recipe Description required"],
    },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    images: [{ type: String, required: true }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
