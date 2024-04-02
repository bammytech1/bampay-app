const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getWalletBalance,
  updateWalletBalance,
  initiateWithdrawal,
} = require("../controllers/walletController");

router.get("/balance", protect, getWalletBalance);
router.post("/update", protect, updateWalletBalance);
router.post("/withdraw", protect, initiateWithdrawal);

module.exports = router;
