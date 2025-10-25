import {
  createRazorpayOrder,
  verifyPaymentSignature,
  saveOrderAndClearCart,
} from "../services/paymentService.js";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await createRazorpayOrder(amount);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmPayment = async (req, res) => {
  console.log("Payment payload received:", req.body);
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      items,
      total,
    } = req.body;

    if (
      !verifyPaymentSignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      )
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    const order = await saveOrderAndClearCart({
      userId,
      items,
      total,
      razorpay_order_id,
      razorpay_payment_id,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Payment confirm error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
