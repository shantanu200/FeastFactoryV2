import jwt from "jsonwebtoken";
export const generateToken = (_id: string): string => {
  return jwt.sign({ id: _id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};
