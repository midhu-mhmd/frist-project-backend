import * as cartService from "../services/cartService.js";

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

export const addToCart = catchAsync(async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const cart = await cartService.addToCartService(userId, productId, quantity);
  res.status(200).json({ message: "Item added to cart", cart });
});

export const getUserCart = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const cart = await cartService.getUserCartService(userId);
  res.status(200).json(cart);
});

export const updateCartItem = catchAsync(async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;
  const cart = await cartService.updateCartItemService(
    userId,
    productId,
    quantity
  );
  res.status(200).json({ message: "Cart updated successfully", cart });
});

export const updateCart = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { items } = req.body;
  const cart = await cartService.updateCartService(userId, items);
  res.status(200).json({ message: "Cart updated", cart });
});

export const removeCartItem = catchAsync(async (req, res) => {
  const { userId, productId } = req.params;
  const cart = await cartService.removeCartItemService(userId, productId);
  res.status(200).json({ message: "Item removed successfully", cart });
});

export const clearCart = catchAsync(async (req, res) => {
  await cartService.clearCartService(req.params.userId);
  res.status(200).json({ message: "Cart cleared successfully" });
});
