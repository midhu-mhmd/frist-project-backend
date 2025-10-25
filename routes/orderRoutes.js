import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
} from "../controllers/orderController.js";

const orderRoutes = express.Router();

orderRoutes.post("/", createOrder);

orderRoutes.get("/", getAllOrders);

orderRoutes.get("/:userId", getUserOrders);

export default orderRoutes;
