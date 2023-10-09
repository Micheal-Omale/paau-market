import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action) {
      return [...action.payload];
    },
  },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
