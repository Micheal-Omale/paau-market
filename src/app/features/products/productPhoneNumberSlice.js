import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productPhoneNumber = createSlice({
  name: "product-phone-number",
  initialState,
  reducers: {
    addProductPhoneNumber(state, action) {
      return [...action.payload];
    },
  },
});

export const { addProductPhoneNumber } = productPhoneNumber.actions;
export default productPhoneNumber.reducer;
