const GiftCard = require("../models/giftcardModel");

// Create a new gift card trade
exports.createTrade = async (req, res) => {
  try {
    const trade = new GiftCard({
      ...req.body,
      user: req.user._id, // Assuming you have middleware to set req.user
    });
    await trade.save();
    res.status(201).json(trade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all trades
exports.getTrades = async (req, res) => {
  try {
    const trades = await GiftCard.find().populate("user", "name");
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single trade by ID
exports.getTradeById = async (req, res) => {
  try {
    const trade = await GiftCard.findById(req.params.id);
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }
    res.json(trade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a trade
exports.updateTrade = async (req, res) => {
  try {
    const trade = await GiftCard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }
    res.json(trade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a trade
exports.deleteTrade = async (req, res) => {
  try {
    const trade = await GiftCard.findByIdAndDelete(req.params.id);
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
