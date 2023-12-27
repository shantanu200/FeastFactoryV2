import { IUser } from "../interfaces/IUser";
import User from "../models/User";
import { generateToken } from "../utils/WebToken";

export async function createUser(body: IUser) {
  return await User.create(body);
}

export async function getUserById(id: string) {
  return await User.findById(id).populate("recipes");
}

export async function getUserByUsername(username: string) {
  return await User.findOne({ username }).populate("recipes");
}

export async function updateUserById(id: string, body: IUser) {
  return await User.findByIdAndUpdate(id, body, { new: true });
}

export async function loginUser(username: string, password: string) {
  
  const user = await User.findOne({ username });
  
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  } else if (user.password !== password) {
    return {
      success: false,
      message: "Password is incorrect",
    };
  } else {
    return {
      success: true,
      message: "Login successful",
      data: {
        userName: user.username,
        accessToken: generateToken(user._id),
      },
    };
  }
}
