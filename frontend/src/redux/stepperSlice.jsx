import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  step: 1, // Current step of the form
  totalSteps: 6,
  id: {},
  formData: {}, // Data for the form
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
  },
});

export const { setFormData, nextStep, prevStep, tradeId } =
  stepperSlice.actions;

export default stepperSlice.reducer;
