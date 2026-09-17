import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/User.js";
import Subscription from "../models/Subscription.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. Create an order (replaces createCheckoutSession)
export const createOrder = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user.plan === "premium") {
    throw new ApiError(400, "You already have a premium plan");
  }

  const amount = Number(process.env.PREMIUM_PLAN_AMOUNT); // in paise, e.g. 49900 for ₹499
  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `receipt_${user._id}_${Date.now()}`,
    notes: { userId: user._id.toString() },
  });

  await Subscription.create({
    user: user._id,
    razorpayOrderId: order.id,
    plan: "premium",
    status: "pending",
  });

  res.status(200).json({
    success: true,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.RAZORPAY_KEY_ID, // frontend needs this to open checkout
  });
});

// 2. Verify payment after frontend checkout succeeds (replaces the Stripe redirect flow)
export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ApiError(400, "Missing payment verification fields");
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new ApiError(400, "Payment verification failed");
  }

  const subscription = await Subscription.findOneAndUpdate(
    { razorpayOrderId: razorpay_order_id },
    {
      status: "active",
      razorpayPaymentId: razorpay_payment_id,
    },
    { new: true },
  );

  if (subscription) {
    await User.findByIdAndUpdate(subscription.user, {
      plan: "premium",
      razorpaySubscriptionId: razorpay_payment_id,
    });
  }

  res.status(200).json({ success: true, message: "Payment verified" });
});

// 3. Status check (barely changes)
export const getSubscriptionStatus = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    plan: req.user.plan,
    subscription: subscription || null,
  });
});

// 4. Webhook (server-to-server backup confirmation — replaces stripeWebhook)
export const razorpayWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(req.body) // must be raw body — see note below
    .digest("hex");

  if (expectedSignature !== signature) {
    console.error("Razorpay webhook signature mismatch");
    return res
      .status(400)
      .json({ success: false, message: "Invalid signature" });
  }

  const event = JSON.parse(req.body);

  switch (event.event) {
    case "payment.captured": {
      const payment = event.payload.payment.entity;
      const updated = await Subscription.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        { status: "active", razorpayPaymentId: payment.id },
        { new: true },
      );
      if (updated) {
        await User.findByIdAndUpdate(updated.user, { plan: "premium" });
      }
      break;
    }

    case "payment.failed": {
      const payment = event.payload.payment.entity;
      await Subscription.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        { status: "failed" },
      );
      break;
    }

    default:
      break;
  }

  res.status(200).json({ received: true });
});
