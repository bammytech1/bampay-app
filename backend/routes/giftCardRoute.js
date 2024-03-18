const express = require("express");
const router = express.Router();
const {
  createTrade,
  getTrades,
  getTradeById,
  updateTrade,
  deleteTrade,
} = require("../controllers/giftCardController");

// Assuming you have authentication middleware to protect routes
const { protect, adminOnly } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getTrades) // Get all trades
  .post(protect, createTrade); // Create a new trade

router
  .route("/:id")
  .get(protect, getTradeById) // Get a trade by ID
  .patch(protect, updateTrade) // Update a trade
  .delete(protect, deleteTrade); // Delete a trade

module.exports = router;
