import axios from "axios";

// export const url = "http://localhost:5000/api";
// const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const BACKEND_URL = "http://localhost:5000";
console.log(BACKEND_URL);
export const API_URL = `${BACKEND_URL}/api/wallet/`;
console.log(API_URL);

// Update wallet balance
export const walletService = {
  updateBalance: async (amount) => {
    const response = await axios.post(`${API_URL}update`, { amount });
    return response.data;
  },

  fetchBalance: async () => {
    const response = await axios.get(`${API_URL}balance`);
    return response.data;
  },

  startWithdrawal: async (withdrawalDetails) => {
    const response = await axios.post(`${API_URL}withdraw`, withdrawalDetails);
    return response.data;
  },
};
