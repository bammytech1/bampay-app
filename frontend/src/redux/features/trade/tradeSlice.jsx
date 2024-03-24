import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tradeService } from "./tradeService";

// Async thunk for creating a new trade
export const createTrade = createAsyncThunk(
  "trades/create",
  async (tradeData, thunkAPI) => {
    try {
      return await tradeService.createTrade(tradeData);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Initial state
const initialState = {
  trades: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Trade slice
export const tradeSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTrade.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrade.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trades.push(action.payload);
      })
      .addCase(createTrade.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    // Handle other async actions (e.g., fetchTrades, updateTrade, deleteTrade) similarly
  },
});

export const { reset } = tradeSlice.actions;

export default tradeSlice.reducer;
