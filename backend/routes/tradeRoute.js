const express = require("express");
const {
  createTrade,
  getTrades,
  getTrade,
  updateTrade,
} = require("../controllers/tradeController");
// Import other controller functions as needed

const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Route to create a new trade
router.post("/", createTrade, protect);
router.get("/", getTrades, protect);
router.get("/:id", getTrade, protect);
router.patch("/:id", updateTrade, protect, adminOnly);

// Define other routes as needed (e.g., GET for listing trades)

module.exports = router;
