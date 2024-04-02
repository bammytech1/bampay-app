import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { walletService } from "./walletService";

export const fetchBalance = createAsyncThunk(
  "wallet/fetchBalance",
  async (_, { rejectWithValue }) => {
    try {
      const data = await walletService.fetchBalance();
      return data.balance; // Assuming the API returns an object with a `balance` field
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const startWithdrawal = createAsyncThunk(
  "wallet/startWithdrawal",
  async (withdrawalDetails, { rejectWithValue }) => {
    try {
      const result = await walletService.startWithdrawal(withdrawalDetails);
      return result.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBalance = createAsyncThunk(
  "wallet/updateBalance",
  async (amount, { rejectWithValue }) => {
    try {
      const data = await walletService.updateBalance(amount);
      return data.balance; // Assuming the response includes the updated balance
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    balance: 0,
    isLoading: false,
    isWithdrawing: false,
    withdrawalMessage: "",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
        state.isLoading = false;
      })
      .addCase(startWithdrawal.pending, (state) => {
        state.isWithdrawing = true;
      })
      .addCase(startWithdrawal.fulfilled, (state, action) => {
        state.isWithdrawing = false;
        state.withdrawalMessage = action.payload;
      })
      .addCase(startWithdrawal.rejected, (state, action) => {
        state.isWithdrawing = false;
        state.error = action.payload;
      })
      .addCase(updateBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload;
      })
      .addCase(updateBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default walletSlice.reducer;
