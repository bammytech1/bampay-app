import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "../redux/exchange/exchangeSlice";
import stepperReducer from "../redux/stepperSlice";
import authReducer from "../redux/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exchange: exchangeReducer,
    step: stepperReducer,
  },
});
