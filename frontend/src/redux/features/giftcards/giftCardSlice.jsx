// src/features/giftCards/giftCardSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { giftCardService } from "./giftCardService";

// Create async thunks
export const createGiftCard = createAsyncThunk(
  "giftCards/create",
  async (giftCardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await giftCardService.createGiftCard(giftCardData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get giftcards

export const getGiftCards = createAsyncThunk(
  "giftCards/getCards",
  async (_, thunkAPI) => {
    try {
      return await giftCardService.getGiftCards();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateGiftCard = createAsyncThunk(
  "giftCards/updateGiftCard",
  async ({ id, giftCardData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await giftCardService.updateGiftCard(id, giftCardData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteGiftCard = createAsyncThunk(
  "giftCards/deleteGiftCard",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await giftCardService.deleteGiftCard(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Initial state
const initialState = {
  giftCards: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Slice
export const giftCardSlice = createSlice({
  name: "giftCard",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGiftCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGiftCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.giftCards.push(action.payload);
      })
      .addCase(createGiftCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getGiftCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGiftCards.fulfilled, (state, action) => {
        state.giftCards = action.payload;
        console.log(action.payload);
      })
      .addCase(getGiftCards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log("Error fetching gift cards:", action.payload);
      })

      .addCase(updateGiftCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGiftCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.giftCards.findIndex(
          (giftCard) => giftCard._id === action.payload._id
        );
        if (index !== -1) {
          state.giftCards[index] = action.payload; // Update the item
        }
      })
      .addCase(updateGiftCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteGiftCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGiftCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.giftCards = state.giftCards.filter(
          (giftCard) => giftCard._id !== action.meta.arg
        ); // Remove the item
      })
      .addCase(deleteGiftCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    // Handle other async thunks similarly...
  },
});

export const { reset } = giftCardSlice.actions;

export default giftCardSlice.reducer;
