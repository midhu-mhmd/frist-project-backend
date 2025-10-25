import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/errorHandler.js";

export const registerUserService = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new AppError("User already exists", 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { message: "User registered", token };
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("User not found", 400);

  // BLOCK CHECK
  if (user.Blocked) throw new AppError("Your account has been blocked.", 403);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("Invalid password", 400);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      Blocked: user.Blocked,
    },
  };
};

export const getAllUsersService = async () => {
  const users = await User.find().select("-password");
  return users;
};

export const getUserProfileService = async (user) => {
  return user;
};
