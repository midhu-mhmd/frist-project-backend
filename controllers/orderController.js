import {
  createOrderService,
  getAllOrdersService,
  getUserOrdersService,
} from "../services/orderService.js";

export const createOrder = async (req, res) => {
  try {
    const order = await createOrderService(req.body);
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersService();
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await getUserOrdersService(userId);
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
