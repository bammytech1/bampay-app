import { createSlice, nanoid } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

const initialState = {
  step: 1, // Current step of the form
  totalSteps: 5,
  id: "",
  tradeMongoId: null, // To store MongoDB's _id of the trade
  formData: {}, // Data for the form
  selectedGiftCard: null,
  tradeStatus: "",
};

const stepperSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      console.log("Before update formData:", state.formData);
      state.formData = { ...state.formData, ...action.payload };
      console.log("After update formData:", state.formData);
    },
    nextStep: (state) => {
      if (state.step < state.totalSteps) {
        state.step += 1;
      }
    },
    prevStep: (state) => {
      if (state.step > 1) {
        state.step -= 1;
      }
    },
    tradeId: (state) => {
      state.id = nanoid("10");
    },
    setSelectedGiftCard: (state, action) => {
      state.selectedGiftCard = action.payload;
    },
    setTradeStatus: (state, action) => {
      state.tradeStatus = action.payload;
    },
    setTradeMongoId: (state, action) => {
      console.log("Before update:", state.tradeMongoId);
      state.tradeMongoId = action.payload;
      console.log("After update:", state.tradeMongoId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      console.log("Rehydrating:", action.payload);
      // Only update state if tradeMongoId or tradeStatus are not already set
      if (!state.tradeMongoId && action.payload?.step?.tradeMongoId) {
        state.tradeMongoId = action.payload.step.tradeMongoId;
      }
      if (!state.tradeStatus && action.payload?.step?.tradeStatus) {
        state.tradeStatus = action.payload.step.tradeStatus;
      }
    });
    // Handle other actions...
  },
});

export const {
  setFormData,
  nextStep,
  prevStep,
  tradeId,
  setSelectedGiftCard,
  setTradeStatus,
  setTradeMongoId,
} = stepperSlice.actions;

export default stepperSlice.reducer;
