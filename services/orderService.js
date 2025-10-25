  import ordersModel from "../models/ordersModel.js";

  export const createOrderService = async (orderData) => {
    const order = await ordersModel.create(orderData);
    return order;
  };

  export const getAllOrdersService = async () => {
    const orders = await ordersModel.find();
    return orders;
  };

  export const getUserOrdersService = async (userId) => {
    const orders = await ordersModel.find({ userId });
    return orders;
  };
