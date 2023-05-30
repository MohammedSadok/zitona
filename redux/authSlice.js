import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  isAuthenticated: true,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,

  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    createAccountStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createAccountSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    createAccountFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  createAccountStart,
  createAccountSuccess,
  createAccountFailure,
} = authSlice.actions;



export default authSlice.reducer;
