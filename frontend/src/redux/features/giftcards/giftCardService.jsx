import axios from "axios";

// export const url = "http://localhost:5000/api";
// const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const BACKEND_URL = "http://localhost:5000";
console.log(BACKEND_URL);
export const API_URL = `${BACKEND_URL}/api/giftcards/`;
console.log(API_URL);

// Create a new gift card
const createGiftCard = async (giftCardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, giftCardData, config);
  return response.data;
};

// Fetch all gift cards
const getGiftCards = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update a gift card
const updateGiftCard = async (id, giftCardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(`${API_URL}${id}`, giftCardData, config);
  return response.data;
};

// Delete a gift card
const deleteGiftCard = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}${id}`, config);
  return response.data;
};

export const giftCardService = {
  createGiftCard,
  getGiftCards,
  updateGiftCard,
  deleteGiftCard,
};
