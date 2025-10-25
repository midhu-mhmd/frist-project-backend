import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";
import { AppError } from "../utils/errorHandler.js";

export const addToCartService = async (userId, productId, quantity) => {
  if (!userId || !productId || !quantity) {
    throw new AppError("All fields are required", 400);
  }

  const product = await Product.findById(productId);
  if (!product) throw new AppError("Product not found", 404);

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [{ productId, quantity }] });
  } else {
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }

  await cart.save();
  return cart;
};

export const getUserCartService = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate("items.productId");
  if (!cart) throw new AppError("Cart not found", 404);
  return cart;
};

export const updateCartItemService = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new AppError("Cart not found", 404);

  const item = cart.items.find((i) => i.productId.toString() === productId);
  if (!item) throw new AppError("Item not found in cart", 404);

  item.quantity = quantity;
  await cart.save();
  return cart;
};

export const updateCartService = async (userId, items) => {
  let cart = await Cart.findOne({ userId });

  const formattedItems = items.map((item) => {
    if (!mongoose.Types.ObjectId.isValid(item.productId)) {
      throw new AppError(`Invalid productId: ${item.productId}`, 400);
    }
    return {
      productId: new mongoose.Types.ObjectId(item.productId),
      quantity: Number(item.quantity),
    };
  });

  if (!cart) {
    cart = new Cart({ userId, items: formattedItems });
  } else {
    cart.items = formattedItems;
  }

  await cart.save();
  return cart;
};

export const removeCartItemService = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new AppError("Cart not found", 404);

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  await cart.save();
  return cart;
};

export const clearCartService = async (userId) => {
  const cart = await Cart.findOneAndDelete({ userId });
  if (!cart) throw new AppError("Cart not found", 404);
  return cart;
};
