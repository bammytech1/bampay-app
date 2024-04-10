// controllers/walletController.js
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const sendEmail = require("../utils/sendEmail");
const nodemailer = require("nodemailer");

exports.getWalletBalance = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ balance: user.walletBalance });
};

exports.updateWalletBalance = async (userId, amountToAdd) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.walletBalance += amountToAdd;
    await user.save();
    console.log(`Wallet updated. New balance: ${user.walletBalance}`);
  } catch (error) {
    console.error("Error updating wallet balance:", error.message);
  }
};

exports.initiateWithdrawal = async (req, res) => {
  const userId = req.user._id; // Or however you get the user's ID
  const { amount } = req.body;
  const numericAmount = parseFloat(amount); // Ensure amount is a number

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.bankAccount || !user.bankAccount.accountNumber) {
      return res
        .status(400)
        .json({ message: "Bank account details are required" });
    }

    if (numericAmount <= 0) {
      return res.status(400).json({ message: "Invalid withdrawal amount." });
    }

    if (user.walletBalance < numericAmount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    user.walletBalance -= numericAmount; // Deduct the withdrawal amount
    await user.save();

    const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
    // Initiate the withdrawal transaction
    const transaction = new Transaction({
      amount: numericAmount,
      sender: userId,
      receiver: user.bankAccount.accountNumber,
      transactionType: "withdrawal",
      description: "Withdrawal to bank account",
      status: "pending", // Assuming withdrawal needs approval
      bankAccount: user.bankAccount,
      verificationCode,
            verified: false,
    });

    await transaction.save();


    // Send a verification email to the user
    const emailTemplate = {
      body: {
        name: user.email,
        intro: `You have requested a withdrawal from your wallet. Your withdrawal verification code is ${verificationCode} `,
        action: {
          instructions:
            "Please use the following code to verify your withdrawal request:",
        },
        outro:
          "If you did not request this withdrawal, please contact our support immediately.",
      },
    };

    await sendEmail(
      "Withdrawal Verification",
      user.email,
      "Verify your withdrawal request",
      emailTemplate
  );

  res.json({
      message: "Withdrawal initiated successfully",
      transactionId: transaction._id,
  });

   
  } catch (error) {
    console.error("Withdrawal error:", error);
    res.status(500).json({ message: "Error processing withdrawal" });
  }
};

// Function to verify withdrawal with the code sent to the user
exports.verifyWithdrawal = async (req, res) => {
  const user = await User.findById(userId);
  const { userId, transactionId, verificationCode } = req.body;
  const transaction = await Transaction.findById(transactionId);

  if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
  }

  if (transaction.sender.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
  }

  if (transaction.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code" });
  }

  transaction.verified = true;
  await transaction.save();

  // Notify the admin for approval
   // Send notification to the admin
   const adminEmailTemplate = {
    body: {
      name: "Admin",
      intro: `A new withdrawal request has been initiated by ${user.email}.`,
      action: {
        instructions:
          "Please review the withdrawal request in the admin panel.",
        button: {
          color: "#3869D4",
          text: "Review Withdrawal",
          link: `${process.env.CLIENT_URL}/withdrawal-requests/${transaction._id}`,
        },
      },
      outro: "This withdrawal is pending your approval.",
    },
  };

  sendEmail(
    "New Withdrawal Request",
    "email": "bayodegbenga256@gmail.com",
    "A new withdrawal request needs your approval",
    adminEmailTemplate
  );

  res.json({
    message: "Withdrawal initiated successfully",
    transactionId: transaction._id,
  });

  res.json({ message: "Withdrawal verified successfully, pending admin approval." });
};

exports.approveWithdrawal = async (req, res) => {
  const { transactionId } = req.body;
  const transaction = await Transaction.findById(transactionId);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  // Check if the transaction is verified before approving
  if (transaction.status !== 'verified') {
    return res.status(400).json({ message: "Transaction not verified" });
  }

  transaction.status = 'approved';
  await transaction.save();

  // Notify the user about the approved withdrawal
  const user = await User.findById(transaction.sender);
  sendEmail(
    user.email,
    "Withdrawal Approved",
    `Your withdrawal of ${transaction.amount} has been approved and will be processed shortly.`
  );

  res.json({ message: "Withdrawal approved successfully" });
};

exports.finalizeWithdrawal = async (req, res) => {
  const { transactionId } = req.body;
  const transaction = await Transaction.findById(transactionId);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  // Check if the transaction is approved before finalizing
  if (transaction.status !== 'approved') {
    return res.status(400).json({ message: "Transaction not approved" });
  }

  // Assuming the payment is processed here manually or through some process

  transaction.status = 'completed'; // Mark the transaction as completed
  await transaction.save();

  res.json({ message: "Withdrawal completed successfully" });
};

exports.cancelWithdrawal = async (req, res) => {
  const { transactionId } = req.body;
  const transaction = await Transaction.findById(transactionId);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  // Add the amount back to the user's wallet balance
  const user = await User.findById(transaction.sender);
  user.walletBalance += transaction.amount;
  await user.save();

  // Update the transaction status to 'cancelled'
  transaction.status = 'cancelled';
  await transaction.save();

  res.json({ message: "Withdrawal cancelled successfully" });
};