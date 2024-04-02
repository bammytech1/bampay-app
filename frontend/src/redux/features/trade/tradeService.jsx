import axios from "axios";

// export const url = "http://localhost:5000/api";
// const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const BACKEND_URL = "http://localhost:5000";
console.log(BACKEND_URL);
export const API_URL = `${BACKEND_URL}/api/trades/`;
console.log(API_URL);

// Create a new trade
const createTrade = async (tradeData) => {
  try {
    const response = await axios.post(API_URL, tradeData);
    return response.data;
  } catch (error) {
    // Handle or throw error
    console.error("Error creating trade:", error.response.data);
    throw error;
  }
};

// Create a new trade
const getTrades = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//get trade status

const fetchTradeStatus = async (tradeMongoId) => {
  try {
    const response = await axios.get(`${API_URL}${tradeMongoId}/status`);
    return response.data.status;
  } catch (error) {
    // Handle or throw error
    console.error("Error fetching status:", error.response.data);
    throw error;
  }
};
// Add other trade-related API calls as necessary (e.g., fetchTrades, updateTrade, deleteTrade)

export const tradeService = {
  createTrade,
  getTrades,
  fetchTradeStatus,
  // Export other functions as necessary
};
