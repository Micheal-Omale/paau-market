import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    id: "",
    emailAddress: "",
    phoneNumber: "",
    firstName: "",
    surname: "",
  },
  isLoggedIn: false,
};

const authenticationSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticated(state, action) {
      return {
        ...state.user,
        info: { ...action.payload.info },
        isLoggedIn: action.payload.isLoggedIn,
      };
    },
  },
});

export const { authenticated } = authenticationSlice.actions;
export default authenticationSlice.reducer;
