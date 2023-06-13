import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from "../constants/ApiUrl";
const initialState = {
  recolts: [],
  loading: false,
  error: null,
};

const URL = ApiUrl + "/recoltes";

export const fetchRecolts = createAsyncThunk(
  "recolts/fetchRecolts",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(URL + "/parcelle/" + id);
      const data = response.data.data;
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
      return response.data.data;
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
      const response = await axios.put(`${URL}/${data.id}`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recoltSlice = createSlice({
  name: "recolts",
  initialState,
  reducers: {
    sortByDate: (state) => {
      state.recolts.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    sortByQuality: (state) => {
      state.recolts.sort((a, b) => {
        const qualiteA = a.qualite.toUpperCase();
        const qualiteB = b.qualite.toUpperCase();
        if (qualiteA < qualiteB) {
          return -1;
        }
        if (qualiteA > qualiteB) {
          return 1;
        }
        return 0;
      });
    },
    sortByMethode: (state) => {
      state.recolts.sort((a, b) => {
        const methodeA = a.methode.toUpperCase();
        const methodeB = b.methode.toUpperCase();
        if (methodeA < methodeB) {
          return -1;
        }
        if (methodeA > methodeB) {
          return 1;
        }
        return 0;
      });
    },
    sortByQuantite: (state) => {
      state.recolts.sort((a, b) => {
        return a.quantite - b.quantite;
      });
    },
    sortByCout: (state) => {
      state.recolts.sort((a, b) => {
        return a.cout - b.cout;
      });
    },
  },
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
export const {
  sortByDate,
  sortByCout,
  sortByMethode,
  sortByQuality,
  sortByQuantite,
} = recoltSlice.actions;
export default recoltSlice.reducer;
