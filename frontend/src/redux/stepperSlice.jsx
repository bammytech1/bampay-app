import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  steps: 1, // Current step of the form
  totalSteps: 6, //total number of steps in the stepper
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
      if (state.steps < state.totalSteps) {
        state.steps += 1;
      }
    },
    prevStep: (state) => {
      if (state.steps > 1) {
        state.steps -= 1;
      }
    },
  },
});

export const { setFormData, nextStep, prevStep } = stepperSlice.actions;

export default stepperSlice.reducer;
