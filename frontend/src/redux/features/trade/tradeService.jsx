import axios from "axios";

// export const url = "http://localhost:5000/api";
// const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const BACKEND_URL = "http://localhost:5000";
console.log(BACKEND_URL);
export const API_URL = `${BACKEND_URL}/api/trades/`;
console.log(API_URL);

// Create a new trade
const createTrade = async (tradeData) => {
  const response = await axios.post(API_URL, tradeData);
  return response.data;
};

// Add other trade-related API calls as necessary (e.g., fetchTrades, updateTrade, deleteTrade)

export const tradeService = {
  createTrade,
  // Export other functions as necessary
};
