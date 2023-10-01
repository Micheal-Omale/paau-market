import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { _id: "1", phoneNumber: "090255", productId: "1" },
  {
    _id: "2",
    phoneNumber: "060265",
    productId: "31b50ad6-1e8e-4fd7-bfa9-18ec299c8227",
  },
  {
    _id: "3",
    phoneNumber: "080390",
    productId: "a77a163e-3d09-4561-8a6a-f113d2250afa",
  },
];

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
