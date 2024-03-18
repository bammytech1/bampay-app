const mongoose = require("mongoose");

const giftCardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    currency: {
      type: String,
      required: [true, "Please add a currency"],
      trim: true,
    },
    receipt: {
      type: String,
      default: "Any Receipt",
      trim: true,
    },
    waitTime: {
      type: Number,
      required: [true, "Please add waiting time"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Please add a brand"],
      trim: true,
    },

    bin: {
      type: Number,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    rate: {
      type: Number,
      required: [true, "Please add a card rate"],
      trim: true,
    },
    minTake: {
      type: Number,
      required: [true, "Please add minimum take"],
      trim: true,
    },
    maxTake: {
      type: Number,
      required: [true, "Please add maximum take"],
      trim: true,
    },
    instruction: {
      type: String,
      required: [true, "Please add a instruction"],
      trim: true,
    },
    tradeCount: {
      type: Number,
      default: 0,
      trim: true,
    },
    image: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
);

giftCardSchema.index({ name: "text" });

const GiftCard = mongoose.model("GiftCard", giftCardSchema);
module.exports = GiftCard;
