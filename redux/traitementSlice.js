import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from "../constants/ApiUrl";
const initialState = {
  traitements: [],
  loading: false,
  error: null,
};

const URL = ApiUrl + "/traitements";

export const fetchTraitements = createAsyncThunk(
  "traitements/fetchTraitements",
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

export const deleteTraitement = createAsyncThunk(
  "traitements/deleteTraitement",
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

export const createTraitement = createAsyncThunk(
  "traitements/createTraitement",
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

export const updateTraitement = createAsyncThunk(
  "traitements/updateTraitement",
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

const traitementSlice = createSlice({
  name: "traitements",
  initialState,
  reducers: {
    sortByDate: (state) => {
      state.traitements.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    // sortByQuality: (state) => {
    //   state.traitements.sort((a, b) => {
    //     const qualiteA = a.qualite.toUpperCase();
    //     const qualiteB = b.qualite.toUpperCase();
    //     if (qualiteA < qualiteB) {
    //       return -1;
    //     }
    //     if (qualiteA > qualiteB) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    // },
    // sortByMethode: (state) => {
    //   state.traitements.sort((a, b) => {
    //     const methodeA = a.methode.toUpperCase();
    //     const methodeB = b.methode.toUpperCase();
    //     if (methodeA < methodeB) {
    //       return -1;
    //     }
    //     if (methodeA > methodeB) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    // },
    // sortByQuantite: (state) => {
    //   state.traitements.sort((a, b) => {
    //     return a.quantite - b.quantite;
    //   });
    // },
    // sortByCout: (state) => {
    //   state.traitements.sort((a, b) => {
    //     return a.cout - b.cout;
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTraitements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTraitements.fulfilled, (state, action) => {
        state.loading = false;
        state.traitements = action.payload;
      })
      .addCase(fetchTraitements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTraitement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTraitement.fulfilled, (state, action) => {
        state.loading = false;
        state.traitements.push(action.payload);
      })
      .addCase(createTraitement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTraitement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTraitement.fulfilled, (state, action) => {
        state.loading = false;
        state.traitements = state.traitements.map((element) =>
          element.id === action.payload.id
            ? { ...element, ...action.payload }
            : element
        );
      })
      .addCase(updateTraitement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTraitement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTraitement.fulfilled, (state, action) => {
        state.loading = false;
        state.traitements = state.traitements.filter(
          (Traitement) => Traitement.id !== action.payload
        );
      })
      .addCase(deleteTraitement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {
  sortByDate,
  // sortByCout,
  // sortByMethode,
  // sortByQuality,
  // sortByQuantite,
} = traitementSlice.actions;
export default traitementSlice.reducer;
