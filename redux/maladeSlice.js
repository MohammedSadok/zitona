import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  maladies: [],
  loading: false,
  error: null,
};

const URL = "http://192.168.1.103:3000/recolts";

export const fetchMaladies = createAsyncThunk(
  "recolts/fetchRecolts",
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

export const deleteRecolt = createAsyncThunk(
  "recolts/deleteRecolt",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.delete(URL + `/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRecolt = createAsyncThunk(
  "recolts/createRecolt",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(URL, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRecolt = createAsyncThunk(
  "recolts/updateRecolt",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.patch(`${URL}/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recoltSlice = createSlice({
  name: "recolts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecolts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecolts.fulfilled, (state, action) => {
        state.loading = false;
        state.recolts = action.payload;
      })
      .addCase(fetchRecolts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createRecolt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRecolt.fulfilled, (state, action) => {
        state.loading = false;
        state.recolts.push(action.payload);
      })
      .addCase(createRecolt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRecolt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRecolt.fulfilled, (state, action) => {
        state.loading = false;
        state.recolts = state.recolts.map((element) =>
          element.id === action.payload.id
            ? { ...element, ...action.payload }
            : element
        );
      })
      .addCase(updateRecolt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRecolt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRecolt.fulfilled, (state, action) => {
        state.loading = false;
        state.recolts = state.recolts.filter(
          (recolt) => recolt.id !== action.payload
        );
      })
      .addCase(deleteRecolt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default recoltSlice.reducer;
