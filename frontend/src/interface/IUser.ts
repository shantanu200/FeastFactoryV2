import { IRecipe } from "./IRecipe";

export interface IUser {
  _id?: string;
  username: string;
  name: string;
  password: string;
  recipes?: string[] & IRecipe[];
}
