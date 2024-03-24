import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  step: 1, // Current step of the form
  totalSteps: 5,
  id: "",
  formData: {}, // Data for the form
  selectedGiftCard: null,
};

const stepperSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
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
  },
});

export const { setFormData, nextStep, prevStep, tradeId, setSelectedGiftCard } =
  stepperSlice.actions;

export default stepperSlice.reducer;
