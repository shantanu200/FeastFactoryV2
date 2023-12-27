import mongoose, { Document } from "mongoose";
export interface IRecipe extends Document {
  _id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  images: string[];
  user: mongoose.Types.ObjectId;
}
