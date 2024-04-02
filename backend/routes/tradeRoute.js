const express = require("express");
const {
  createTrade,
  getTrades,
  getTrade,
  updateTrade,
  getTradeStatus,
} = require("../controllers/tradeController");
// Import other controller functions as needed

const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Route to create a new trade
router.post("/", protect, createTrade);
router.get("/", protect, getTrades);
router.get("/:id", protect, getTrade);
router.get("/:id/status", protect, getTradeStatus);
router.patch("/:id", protect, adminOnly, updateTrade);

// Define other routes as needed (e.g., GET for listing trades)

module.exports = router;
