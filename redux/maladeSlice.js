import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  malades: [],
  loading: false,
  error: null,
};

const URL = "http://192.168.1.103:3000/malades";

export const fetchMalades = createAsyncThunk(
  "malades/fetchMalades",
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

export const getMalade = createAsyncThunk(
  "malades/getMalade",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(`${URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMalade = createAsyncThunk(
  "malades/deleteMalade",
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

export const createMalade = createAsyncThunk(
  "malades/createMalade",
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

export const updateMalade = createAsyncThunk(
  "malades/updateMalade",
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

const maladeSlice = createSlice({
  name: "malades",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMalades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMalades.fulfilled, (state, action) => {
        state.loading = false;
        state.malades = action.payload;
      })
      .addCase(fetchMalades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get one malade
      .addCase(getMalade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMalade.fulfilled, (state, action) => {
        state.loading = false;
        state.malades.push(action.payload);
      })
      .addCase(getMalade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create
      .addCase(createMalade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMalade.fulfilled, (state, action) => {
        state.loading = false;
        state.malades.push(action.payload);
      })
      .addCase(createMalade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update
      .addCase(updateMalade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMalade.fulfilled, (state, action) => {
        state.loading = false;
        state.malades = state.malades.map((element) =>
          element.id === action.payload.id
            ? { ...element, ...action.payload }
            : element
        );
      })
      .addCase(updateMalade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete
      .addCase(deleteMalade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMalade.fulfilled, (state, action) => {
        state.loading = false;
        state.malades = state.malades.filter(
          (malade) => malade.id !== action.payload
        );
      })
      .addCase(deleteMalade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default maladeSlice.reducer;
