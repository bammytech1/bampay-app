const GiftCard = require("../models/giftcardModel");

// Create a new gift card trade
exports.createGiftCards = async (req, res) => {
  try {
    const giftCards = new GiftCard({
      ...req.body,
      user: req.user._id, // Assuming you have middleware to set req.user
    });
    await giftCards.save();
    res.status(201).json(giftCards);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all giftCardss
exports.getGiftCards = async (req, res) => {
  try {
    const giftCards = await GiftCard.find().populate("user", "name");
    console.log(giftCards); // Check the fetched data
    res.json(giftCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single giftCards by ID
exports.getGiftCardById = async (req, res) => {
  try {
    const giftCard = await GiftCard.findById(req.params.id);
    if (!giftCard) {
      return res.status(404).json({ message: "GiftCards not found" });
    }
    res.json(giftCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a giftCards
exports.updateGiftCard = async (req, res) => {
  try {
    const giftCard = await GiftCard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!giftCard) {
      return res.status(404).json({ message: "GiftCards not found" });
    }
    res.json(giftCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a giftCards
exports.deleteGiftCard = async (req, res) => {
  try {
    const giftCard = await GiftCard.findByIdAndDelete(req.params.id);
    if (!giftCard) {
      return res.status(404).json({ message: "GiftCards not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
