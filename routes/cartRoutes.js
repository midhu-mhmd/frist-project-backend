import express from "express";
import {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  updateCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/", addToCart);
cartRouter.get("/:userId", getUserCart);

cartRouter.put("/:userId", updateCart);

cartRouter.put("/:userId/:productId", updateCartItem);

cartRouter.delete("/:userId/:productId", removeCartItem);
cartRouter.delete("/:userId", clearCart);

export default cartRouter;
