import * as userService from "../services/userService.js";

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

export const registerUser = catchAsync(async (req, res) => {
  const data = await userService.registerUserService(req.body);
  res.status(201).json(data);
});

export const loginUser = catchAsync(async (req, res) => {
  const data = await userService.loginUserService(req.body);
  res.status(200).json(data);
});

export const getUserProfile = catchAsync(async (req, res) => {
  const data = await userService.getUserProfileService(req.user);
  res.status(200).json({ user: data });
});

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsersService();
  res.status(200).json(users);
});
