import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from "../constants/ApiUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const URL = ApiUrl + "/api/auth";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(URL + "/login", userData);
      const data = response.data;
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({ ...data.user, password: userData.password })
      );
      await AsyncStorage.setItem("token", JSON.stringify(data.access_token));
      return {
        user: { ...data.user, password: userData.password },
        token: data.access_token,
      };
    } catch (error) {
      return rejectWithValue("L'adresse e-mail ou mot de passe est invalide");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    console.log("=>  file: authSlice.js:39  userData:", userData)
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(URL + "/register", userData);
      console.log("=>  file: authSlice.js:42  response:", response.data)
      const data = response.data.body.data;

      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, id: data.user.id })
      );
      await AsyncStorage.setItem("token", JSON.stringify(data.access_token));
      return {
        user: { ...userData, id: data.user.id },
        token: data.access_token,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue("L'adresse e-mail deja existe !");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    // Remove the token from localStorage or the storage solution
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("token");
    return null;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.message);
  }
});

export const checkUserIfExist = createAsyncThunk(
  "auth/checkUserIfExist",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // await AsyncStorage.removeItem("userData");
      // await AsyncStorage.removeItem("token");

      const user = await AsyncStorage.getItem("userData");
      const token = await AsyncStorage.getItem("token");
      return user
        ? { user: JSON.parse(user), token: JSON.parse(token) }
        : { user: null, token: null };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null; // Clear the token upon logout
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check User If Exist

      .addCase(checkUserIfExist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserIfExist.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkUserIfExist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
