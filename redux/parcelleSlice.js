import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from "../constants/ApiUrl";
const initialState = {
  parcelles: [],
  loading: false,
  error: null,
  parcelle: { id: 0 },
};

const URL = ApiUrl+"/parcelles";

export const fetchParcelles = createAsyncThunk(
  "parcelles/fetchParcelles",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(ApiUrl+"/parcelles/user/1");
      const data = response.data.data;
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteParcelle = createAsyncThunk(
  "parcelles/deleteParcelle",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // Make a DELETE request to the server with the specified ID
      const response = await axios.delete(URL + `/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createParcelle = createAsyncThunk(
  "parcelles/createParcelle",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // Make a POST request to the server with the provided data
      const response = await axios.post(URL, data);
      return response.data.data; // Return the created parcelle object or any relevant data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateParcelle = createAsyncThunk(
  "parcelles/updateParcelle",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // Make a PATCH request to the server with the provided data
      const response = await axios.put(`${URL}/${data.id}`, data);
      return response.data.data; // Return the updated parcelle object or any relevant data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const parcelleSlice = createSlice({
  name: "parcelles",
  initialState,
  reducers: {
    SelectParcelle: (state, action) => {
      state.parcelle = action.payload;
    },
  },
  extraReducers: (builder) => {
    //fetch posts
    builder
      .addCase(fetchParcelles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParcelles.fulfilled, (state, action) => {
        state.loading = false;
        state.parcelles = action.payload;
      })
      .addCase(fetchParcelles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create parcelle
      .addCase(createParcelle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createParcelle.fulfilled, (state, action) => {
        state.loading = false;
        state.parcelles.push(action.payload);
      })
      .addCase(createParcelle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create parcelle
      .addCase(updateParcelle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParcelle.fulfilled, (state, action) => {
        state.loading = false;
        state.parcelles = state.parcelles.map((element) => {
          return element.id === action.payload.id
            ? { ...element, ...action.payload }
            : element;
        });
      })
      .addCase(updateParcelle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete parcelle
      .addCase(deleteParcelle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteParcelle.fulfilled, (state, action) => {
        state.loading = false;
        // Update the parcelles state by removing the deleted parcelle
        state.parcelles = state.parcelles.filter(
          (parcelle) => parcelle.id !== action.payload
        );
      })
      .addCase(deleteParcelle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { SelectParcelle } = parcelleSlice.actions;
export default parcelleSlice.reducer;
