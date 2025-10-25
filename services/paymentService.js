import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import ordersModel from "../models/ordersModel.js";
import Cart from "../models/cartModel.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = async (amount) => {
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_order_" + Date.now(),
  };
  const order = await razorpay.orders.create(options);
  return order;
};

export const verifyPaymentSignature = (orderId, paymentId, signature) => {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  return expectedSignature === signature;
};

export const saveOrderAndClearCart = async ({
  userId,
  items,
  total,
  razorpay_order_id,
  razorpay_payment_id,
}) => {
  const order = await ordersModel.create({
    userId,
    items,
    total,
    status: "paid",
    razorpay_order_id,
    razorpay_payment_id,
  });

  await Cart.findOneAndDelete({ userId });

  return order;
};
