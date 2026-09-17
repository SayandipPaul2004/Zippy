import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
      default: null,
    },
    razorpaySubscriptionId: {
      type: String,
      default: null,
    },
    plan: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "active",
        "canceled",
        "past_due",
        "incomplete",
        "failed",
      ],
      default: "pending",
    },
    amount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "inr",
    },
    currentPeriodEnd: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
