import express from "express";
import {
  createOrder,
  confirmPayment,
} from "../controllers/paymentController.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/create-order", createOrder);
paymentRoutes.post("/confirm", confirmPayment);

export default paymentRoutes;
