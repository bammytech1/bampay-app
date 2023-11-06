import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1, // Current step of the form
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
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
  },
});

export const { setFormData, nextStep, prevStep } = stepperSlice.actions;

export default stepperSlice.reducer;
