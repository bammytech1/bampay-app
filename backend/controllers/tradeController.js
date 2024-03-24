const Trade = require("../models/tradeModel");
const User = require("../models/userModel");
const {
  createUserNotification,
} = require("../NotifcationTemplates/notificationService");
const {
  getTradeStatusUpdateTemplate,
} = require("../emailTemplates/sendEmailNotification");

// Controller to create a new trade
exports.createTrade = async (req, res) => {
  try {
    // Destructure data from req.body
    const {
      currency,
      giftType,
      spend,
      receive,
      paymentOption,
      paymentOptionValue,
      cardNumber,
      cardExp,
      CardCvv,
      imageUrls,
      tradeID,
    } = req.body;

    // Create a new trade object
    const newTrade = await Trade.create({
      userId: req.user._id, // Assuming you have middleware to set req.user
      currency,
      giftType,
      spend,
      receive,
      paymentOption,
      paymentOptionValue,
      cardDetails: {
        cardNumber,
        cardExp,
        cardCvv: CardCvv, // Ensure correct mapping to schema
      },
      imageUrls,
      tradeID,
    });

    res.status(201).json(newTrade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all trades
exports.getTrades = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    let trades;

    // Assuming 'admin' is the role name for admin users
    if (req.user.role === "admin") {
      trades = await Trade.find()
        .populate("userId", "email name")
        .sort("-createdAt"); // Assuming you want to include some user details in the response
    } else {
      trades = await Trade.find({ userId: req.user._id }).sort("-createdAt");
    }

    return res.status(200).json(trades);
  } catch (error) {
    console.error("Failed to retrieve trades:", error);
    return res.status(500).json({ message: "Failed to retrieve trades" });
  }
};

// Get a single trade by ID
exports.getTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }

    res.status(200).json(trade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }

    const user = await User.findById(trade.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update trade status
    if (req.body.status) {
      trade.tradeStatus = req.body.status;

      const emailTemplate = getTradeStatusUpdateTemplate(
        user.firstName,
        trade.tradeStatus
      );
      const subject = "Trade Status Update";
      const send_to = user.email;
      const text = `Your trade status has been updated to ${trade.tradeStatus}. Please log in to your account for more details.`;

      // Send email notification
      await sendEmail(subject, send_to, text, emailTemplate);

      // Creating in-app notification
      createUserNotification({
        userId: user._id,
        message: `Your trade status has been updated to ${trade.tradeStatus}.`,
      });
    }

    // Update other fields if necessary
    const updatedTrade = await trade.save();
    res.status(200).json(updatedTrade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
