const express = require("express");
const router = express.Router();
const {
  createGiftCards,
  getGiftCards,
  getGiftCardById,
  updateGiftCard,
  deleteGiftCard,
} = require("../controllers/giftCardController");

// Assuming you have authentication middleware to protect routes
const { protect, adminOnly } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getGiftCards) // Get all cards
  .post(protect, createGiftCards); // Create a new card

router
  .route("/:id")
  .get(protect, getGiftCardById) // Get a trade by ID
  .patch(protect, updateGiftCard) // Update a trade
  .delete(protect, deleteGiftCard); // Delete a trade

module.exports = router;
