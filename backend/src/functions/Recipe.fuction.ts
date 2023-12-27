import { IRecipe } from "../interfaces/IRecipe";
import Recipe from "../models/Recipe";
import User from "../models/User";

export async function createRecipe(userId: string, body: IRecipe) {
  const recipeObj = await Recipe.create({ ...body, user: userId });

  if (recipeObj && recipeObj._id) {
    await User.findByIdAndUpdate(userId, { $push: { recipes: recipeObj._id } });
  }

  return recipeObj;
}

export async function getRecipes(page: number, limit: number, search: string) {
  let query = {};
  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { ingredients: { $regex: search, $options: "i" } },
      ],
    };
  }
  const data = await Recipe.find(query).populate("user", "name username");
  console.log(data);
  return data;
}

export async function getRecipeById(id: string) {
  return Recipe.findById(id).populate("user", "name username");
}

export async function updateRecipe(id: string, body: IRecipe) {
  return await Recipe.findByIdAndUpdate(id, body, { new: true });
}

export async function deleteRecipe(recipeID: string, userID: string) {
  await User.findOneAndUpdate(
    { _id: userID },
    { $pull: { recipes: recipeID } }
  );
  return await Recipe.findByIdAndDelete(recipeID);
}
