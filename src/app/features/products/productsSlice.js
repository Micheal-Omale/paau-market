import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    category: "Phone",
    imgURL:
      "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/F/N/204636_1663386972.jpg",
    price: "4,000",
    description: "Infinix HOT 12",
    postUserId: "1",
  },
  {
    id: "2",
    category: "Gas Cylinder",
    imgURL:
      "https://egoleshopping.com/images/detailed/17/H1c301c854dc04b92a610efe8d75a2de7N.jpg",
    price: "2,000",
    description: "Gas Cylinder",
    postUserId: "1",
  },
  {
    id: "3",
    category: "Gas Cylinder",
    imgURL:
      "https://egoleshopping.com/images/detailed/17/H1c301c854dc04b92a610efe8d75a2de7N.jpg",
    price: "2,000",
    description: "Gas Cylinder",
    postUserId: "2",
  },
];

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
