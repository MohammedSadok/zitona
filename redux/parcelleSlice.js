import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from "../constants/ApiUrl";
const initialState = {
  parcelles: [],
  loading: false,
  error: null,
  parcelle: { id: 0 },
  totalRecolte: 0,
  totalCoutDepence: 0,
};

const URL = ApiUrl + "/parcelles";

export const getTotalRecolte = createAsyncThunk(
  "parcelles/getTotalRecolte",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(ApiUrl + "/recoltes/parcelle/count_recolt/" + data.id, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);
export const getTotalDepence = createAsyncThunk(
  "parcelles/fetchTotalCoutDepence",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(ApiUrl + "/parcelles/depence/" + data.id, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);
export const fetchParcelles = createAsyncThunk(
  "parcelles/fetchParcelles",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(ApiUrl + "/parcelles/user/" + user.id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = response.data.data;
      return data !== null ? data : [];
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteParcelle = createAsyncThunk(
  "parcelles/deleteParcelle",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // Make a DELETE request to the server with the specified ID
      const response = await axios.delete(URL + `/${data.id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return data.id;
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
      const response = await axios.post(URL, data.parcelle, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
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
      const response = await axios.put(
        `${URL}/${data.parcelle.id}`,
        data.parcelle,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
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
    InitializeParcelle: (state) => {
      state.parcelle = { id: 0 };
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

      //depence
      .addCase(getTotalDepence.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalDepence.fulfilled, (state, action) => {
        state.loading = false;
        state.totalCoutDepence = action.payload;
      })
      .addCase(getTotalDepence.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //total recolte
      .addCase(getTotalRecolte.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalRecolte.fulfilled, (state, action) => {
        state.loading = false;
        state.totalRecolte = action.payload;
      })
      .addCase(getTotalRecolte.rejected, (state, action) => {
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
export const { SelectParcelle,InitializeParcelle } = parcelleSlice.actions;
export default parcelleSlice.reducer;
