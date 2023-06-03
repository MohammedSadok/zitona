import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import parseilSlice from "./parseilSlice";
import recoltSlice from "./recoltSlice";
import maladeSlice from "./maladeSlice";
export const store = configureStore({
  reducer: {
    userAuth: authSlice,
    parseils: parseilSlice,
    recolts: recoltSlice,
    malades: maladeSlice,
  },
});
