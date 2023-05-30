import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import parseilSlice from "./parseilSlice";
export const store = configureStore({
  reducer: {
    userAuth: authSlice,
    parseils: parseilSlice,
  },
});
