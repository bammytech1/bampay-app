// controllers/walletController.js
const User = require("../models/userModel");

exports.getWalletBalance = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ balance: user.walletBalance });
};

exports.updateWalletBalance = async (req, res) => {
  const userId = req.user._id;
  const { amount } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.walletBalance += amount; // Adjust logic based on your needs
  await user.save();
  res.json({ message: "Wallet balance updated", balance: user.walletBalance });
};

exports.initiateWithdrawal = async (req, res) => {
  const userId = req.user._id;
  const { amount } = req.body;
  // Implement your withdrawal logic here
  // This could involve updating the wallet balance and recording the withdrawal
  res.json({ message: "Withdrawal initiated successfully" });
};
