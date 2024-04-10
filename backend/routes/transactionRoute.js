const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  transferFund,
  verifyAccount,
  getUserTransactions,
} = require("../controllers/transactionController");

router.post("/transferFund", express.json(), protect, transferFund);
router.post("/verifyAccount", express.json(), protect, verifyAccount);
router.post(
  "/getUserTransactions",
  express.json(),
  protect,
  getUserTransactions
);

module.exports = router;
