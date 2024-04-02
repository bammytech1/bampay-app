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

//get trades
export const getTrades = createAsyncThunk(
  "trades/getTrades",
  async (_, thunkAPI) => {
    try {
      return await tradeService.getTrades();
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchTradeStatus = createAsyncThunk(
  "trade/fetchTradeStatus",
  async (tradeMongoId, { thunkAPI }) => {
    try {
      const status = await tradeService.fetchTradeStatus(tradeMongoId);
      return status;
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
  status: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Trade slice
export const tradeSlice = createSlice({
  name: "trade",
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
      })
      .addCase(getTrades.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrades.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.trades = action.payload;
        // console.log(action.payload);
      })
      .addCase(getTrades.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchTradeStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchTradeStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload;
      })
      .addCase(fetchTradeStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    // Handle other async actions (e.g., fetchTrades, updateTrade, deleteTrade) similarly
  },
});

export const { reset } = tradeSlice.actions;

export default tradeSlice.reducer;
