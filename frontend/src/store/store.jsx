import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "../redux/exchange/exchangeSlice";
import stepperReducer from "../redux/stepperSlice";

export const store = configureStore({
  reducer: {
    exchange: exchangeReducer,
    step: stepperReducer,
  },
});
