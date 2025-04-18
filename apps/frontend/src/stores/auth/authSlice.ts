import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  isAuth: boolean;
};

const initialState: AuthState = {
  isAuth: JSON.parse(localStorage.getItem("isAuth") || "false"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
      localStorage.setItem("isAuth", JSON.stringify(action.payload));
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
