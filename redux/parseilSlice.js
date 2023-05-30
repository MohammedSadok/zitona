import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  parseils: [],
  loading: false,
  error: null,
  parseil: 1,
};

const URL = "http://192.168.1.103:3000/parseils";

export const fetchParseils = createAsyncThunk(
  "parseils/fetchParseils",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(URL);
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteParseil = createAsyncThunk(
  "parseils/deleteParseil",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // Make a DELETE request to the server with the specified ID
      const response = await axios.delete(URL+`/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const parseilSlice = createSlice({
  name: "parseils",
  initialState,
  reducers: {
    SelectParseil: (state, action) => {
      state.parseil = action.payload;
    },
  },
  extraReducers: (builder) => {
    //fetch posts
    builder
      .addCase(fetchParseils.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParseils.fulfilled, (state, action) => {
        state.loading = false;
        state.parseils = action.payload;
      })
      .addCase(fetchParseils.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete parseil
      .addCase(deleteParseil.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteParseil.fulfilled, (state, action) => {
        state.loading = false;
        // Update the parseils state by removing the deleted parseil
        state.parseils = state.parseils.filter(
          (parseil) => parseil.id !== action.payload
        );
      })
      .addCase(deleteParseil.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { SelectParseil } = parseilSlice.actions;
export default parseilSlice.reducer;
