const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    sender: {
      type: String,
      required: true,
      //   ref: "User",
    },
    receiver: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
      enum: ["transfer", "withdrawal", "deposit"], // Example types
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "verified", "approved", "completed", "cancelled"],
      default: "pending",
    },
    verificationCode: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transactions", transactionSchema);
module.exports = Transaction;
