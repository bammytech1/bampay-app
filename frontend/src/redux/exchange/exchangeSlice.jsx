import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    giftType: "vanilla visa",
    needed: {
      min: "500",
      max: "2000",
    },
    rate: {
      usd: "400",
      aud: "300",
      cad: "302",
      gbp: "490",
    },
    currency: {
      usd: "USD",
      cad: "CAD",
      aud: "AUD",
      gbp: "GBP",
    },
  },
  {
    id: "2",
    giftType: "Target",
    needed: {
      min: "200",
      max: "2000",
    },
    rate: {
      usd: "400",
      aud: "300",
      cad: "302",
      gbp: "490",
    },
    currency: {
      usd: "USD",
      cad: "CAD",
      aud: "AUD",
      gbp: "GBP",
    },
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
