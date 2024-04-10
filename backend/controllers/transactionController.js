const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const { default: mongoose } = require("mongoose");

// Transfer Funds
const transferFund = asyncHandler(async (req, res) => {
  const { amount, senderEmail, receiverEmail, description } = req.body;
  const numericAmount = parseFloat(amount); // Ensure amount is a number

  if (!numericAmount || !senderEmail || !receiverEmail) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  // Using email to find users, but using user IDs is recommended
  const sender = await User.findOne({ email: senderEmail });
  const receiver = await User.findOne({ email: receiverEmail });

  if (!sender) {
    return res.status(404).json({ message: "Sender not found." });
  }

  if (!receiver) {
    return res.status(404).json({ message: "Receiver not found." });
  }

  if (sender.walletBalance < numericAmount) {
    return res.status(400).json({ message: "Insufficient balance." });
  }

  // Start a session to execute MongoDB transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Create the transaction record
    const transaction = new Transaction({
      amount: numericAmount,
      sender: sender._id,
      receiver: receiver._id,
      transactionType: "transfer",
      description,
      status: "completed", // assuming instant transfer
    });
    await transaction.save({ session });

    // Update balances
    sender.walletBalance -= numericAmount;
    receiver.walletBalance += numericAmount;
    await sender.save({ session });
    await receiver.save({ session });

    await session.commitTransaction();

    const sendUser = await User.findById(transaction.sender);
    const receiveUser = await User.findById(transaction.receiver);

    const moneyOutEmailTemplate = {
      body: {
        name: sendUser.firstName,
        intro: `Your transfer request is now completed for ${amount}NGN to  ${receiveUser.email}.`,
        action: {
          instructions: "you can check for recent update in your dashboard.",
          button: {
            color: "#3869D4",
            text: "Check Status",
            link: `${process.env.CLIENT_URL}/withdrawal-requests/${transaction._id}`,
          },
        },
        outro:
          "If you did not request this transfer, please contact our support immediately.",
      },
    };

    const moneyInEmailTemplate = {
      body: {
        name: receiveUser.firstName,
        intro: `${sender.email} has transferred  ${amount}NGN to your wallet.`,
        action: {
          instructions: "you can check for recent update in your dashboard.",
          button: {
            color: "#3869D4",
            text: "Check Status",
            link: `${process.env.CLIENT_URL}/withdrawal-requests/${transaction._id}`,
          },
        },
        outro:
          "If you did not request this transfer, please contact our support immediately.",
      },
    };

    // Send email to the sender
    sendEmail(
      "Transfer Completed",
      sender.email,
      `Your transfer of ${amount} to ${receiver.email} has been completed.`,
      moneyOutEmailTemplate
    );

    // Send email to the receiver
    sendEmail(
      "Funds Received",
      receiver.email,
      `${sender.email} has transferred ${amount} to your account.`,
      moneyInEmailTemplate
    );

    res.status(200).json({
      message: "Transaction successful",
      transactionId: transaction._id,
    });
  } catch (error) {
    await session.abortTransaction();
    res
      .status(500)
      .json({ message: "Transaction failed", error: error.message });
  } finally {
    session.endSession();
  }
});

// verify Account
const verifyAccount = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.receiver });
  if (!user) {
    res.status(404);
    throw new Error("User Account not found");
  }
  res.status(200).json({ message: "Account Verification Successful" });
});

// getUserTransactions
const getUserTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({
    $or: [{ sender: req.body.email }, { receiver: req.body.email }],
  })
    .sort({ createdAt: -1 })
    .populate("sender")
    .populate("receiver");

  res.status(200).json(transactions);
});

// Deposit Funds With BankTransfer

module.exports = {
  transferFund,
  verifyAccount,
  getUserTransactions,
};
