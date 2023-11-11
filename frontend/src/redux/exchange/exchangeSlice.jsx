import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    giftType: "vanilla visa",
    needed: {
      min: "500",
      max: "2000",
      receipt: "cash Receipt",
    },
    rate: "450",
    currency: "USD",
    symbol: "$",
    time: "1:30min",
  },
  {
    id: "2",
    giftType: "Target",
    needed: {
      min: "200",
      max: "2000",
    },
    rate: "350",
    currency: "USD",
    symbol: "$",
    time: "1:10min",
  },
  {
    id: "3",
    giftType: "Amex Visa",
    needed: {
      min: "400",
      max: "1000",
      receipt: "cash Receipt",
    },
    rate: "710",
    currency: "USD",
    symbol: "$",
    time: "30min",
  },
];

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    addTrade(state, action) {
      state.push(action.payload);
    },
  },
});

export const allTrades = (state) => state.exchange;
export const { addTrade } = exchangeSlice.actions;
export default exchangeSlice.reducer;
