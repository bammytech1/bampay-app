import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    //increment
    incremented(state) {
      state.value++;
    },
    //increment
    decremented(state) {
      state.value--;
    },
  },
});

export const { incremented, decremented } = exchangeSlice.actions;
export default exchangeSlice.reducer;
