const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    currency: {
      type: String,
      required: [true, "Please add a currency"],
      trim: true,
    },
    giftType: {
      type: String,
      required: [true, "Please specify the gift card type"],
      trim: true,
    },
    spend: {
      type: Number,
      required: [true, "Please add spend amount"],
      trim: true,
    },
    receive: {
      type: Number,
      required: [true, "Please add receive amount"],
      trim: true,
    },
    paymentOption: {
      type: String,
      required: [true, "Please add a payment option"],
      trim: true,
    },
    paymentOptionValue: {
      type: String,
      required: [true, "Please add payment option value"],
      trim: true,
    },
    cardDetails: {
      cardNumber: String,
      cardExp: String,
      cardCvv: String,
    },
    imageUrls: [
      {
        type: String,
        required: [true, "Please add image URLs"],
      },
    ],
    tradeStatus: {
      type: String,
      required: true,
      default: "Processing", // Example default value
      trim: true,
    },
    tradeID: {
      type: String,
      required: [true, "Please provide a trade ID"],
      trim: true,
      unique: true, // Ensuring trade ID is unique
    },
  },
  {
    timestamps: true, // Keeps track of trade creation and update times
  }
);

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = Trade;
