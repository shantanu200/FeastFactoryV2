import mongoose from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  username: string;
  password: string;
  recipes: mongoose.Types.ObjectId[];
}
