import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", category: "Phone" },
  { id: "2", category: "Gas Cylinder" },
  { id: "3", category: "Lodge" },
  { id: "4", category: "Standing Fan" },
  { id: "5", category: "Reading Table & Chair" },
];

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
});

export default categorySlice.reducer;
