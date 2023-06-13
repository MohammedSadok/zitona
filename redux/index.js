import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import parseilSlice from "./parcelleSlice";
import recoltSlice from "./recoltSlice";
import maladeSlice from "./maladeSlice";
export const store = configureStore({
  reducer: {
    userAuth: authSlice,
    parcelles: parseilSlice,
    recolts: recoltSlice,
    malades: maladeSlice,
  },
});
