import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    logout: (state) => {
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
  logout,
  createAccountStart,
  createAccountSuccess,
  createAccountFailure,
} = authSlice.actions;

export const checkLoggedInUser = () => async (dispatch) => {
  console.log("Checking");
  try {
    // Retrieve user data from AsyncStorage
    const userData = await AsyncStorage.getItem("userData");

    if (userData) {
      const user = JSON.parse(userData);
      dispatch(loginSuccess(user));
    } else {
      dispatch(logout());
    }
  } catch (error) {
    dispatch(logout());
  }
};

export default authSlice.reducer;
