export interface IRecipe {
  _id?: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  images: string[];
  user?: string & {
    _id: string;
    username: string;
    name: string;
  };
}
