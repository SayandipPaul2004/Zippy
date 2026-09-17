import express from "express";
import {
  createOrder,
  verifyPayment,
  getSubscriptionStatus,
  razorpayWebhook,
} from "../controllers/paymentController.js";
import protect from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);
router.get("/status", protect, getSubscriptionStatus);
router.post("/webhook", razorpayWebhook); // no `protect` — Razorpay calls this server-to-server

export default router;
