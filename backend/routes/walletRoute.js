const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getWalletBalance,
  updateWalletBalance,
  initiateWithdrawal,
  verifyWithdrawal,
  approveWithdrawal,
  finalizeWithdrawal,
  cancelWithdrawal,
} = require("../controllers/walletController");

router.get("/balance", protect, getWalletBalance);
router.post("/update", protect, updateWalletBalance);
router.post("/withdraw", protect, initiateWithdrawal);
router.post("/withdraw/verify", protect, verifyWithdrawal);
router.post("/withdraw/approve", protect, adminOnly, approveWithdrawal);
router.post("/withdraw/finalize", protect, adminOnly, finalizeWithdrawal);
router.post("/withdraw/cancel", protect, adminOnly, cancelWithdrawal);

module.exports = router;
