import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  totalSteps: 6, // Current step of the form
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
  },
});

export const { setFormData, nextStep, prevStep } = stepperSlice.actions;

export default stepperSlice.reducer;
