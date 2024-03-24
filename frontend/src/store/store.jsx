import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "../redux/exchange/exchangeSlice";
import stepperReducer from "../redux/stepperSlice";
import authReducer from "../redux/features/auth/authSlice";
import giftCardReducer from "../redux/features/giftcards/giftCardSlice";
import tradeReducer from "../redux/features/trade/tradeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    giftCard: giftCardReducer,
    trades: tradeReducer,
    exchange: exchangeReducer,
    step: stepperReducer,
  },
});
