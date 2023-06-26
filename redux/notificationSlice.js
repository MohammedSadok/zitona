import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from "../constants/ApiUrl";

const initialState = {
  loading: false,
  error: null,
  notification: [],
};

const URL = ApiUrl + "/tasks";
export const fetchNotification = createAsyncThunk(
  "notification/fetchNotification",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(URL + "/parcelle/" + data.id, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data.data !== null ? response.data.data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    sortByDate: (state) => {
      state.notification.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = action.payload;
      })
      .addCase(fetchNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { sortByDate } = notificationSlice.actions;
export default notificationSlice.reducer;
