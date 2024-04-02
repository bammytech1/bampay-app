import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import stepperReducer from "../redux/stepperSlice";
import authReducer from "../redux/features/auth/authSlice";
import giftCardReducer from "../redux/features/giftcards/giftCardSlice";
import tradeReducer from "../redux/features/trade/tradeSlice";
import walletReducer from "../redux/features/wallet/walletSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "trade", "giftCard", "step"], // Only persist
};

const rootReducer = combineReducers({
  auth: authReducer,
  giftCard: giftCardReducer,
  trade: tradeReducer,
  wallet: walletReducer,
  step: stepperReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
  // devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
