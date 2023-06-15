import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from "../constants/ApiUrl";

const initialState = {
  loading: false,
  error: null,
  fertilisations: [],
};

const URL = ApiUrl + "/fertilisations";
export const fetchFertilisations = createAsyncThunk(
  "fertilisations/fetchFertilisations",
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

export const getFertilisation = createAsyncThunk(
  "fertilisations/getFertilisation",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(`${URL}/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFertilisation = createAsyncThunk(
  "fertilisations/deleteFertilisation",
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

export const createFertilisation = createAsyncThunk(
  "fertilisations/createFertilisation",
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

export const updateFertilisation = createAsyncThunk(
  "fertilisations/updateFertilisation",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(`${URL}/${data.id}`, data);
      console.log(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fertilisationSlice = createSlice({
  name: "fertilisations",
  initialState,
  reducers: {
    sortByDate: (state) => {
      state.fertilisations.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    sortByTypeDengrais: (state) => {
      state.fertilisations.sort((a, b) => {
        const engr1 = a.typeDengrais.toUpperCase();
        const engr2 = b.typeDengraist.oUpperCase();
        if (engr1 < engr2) {
          return -1;
        }
        if (engr1 > engr2) {
          return 1;
        }
        return 0;
      });
    },
    sortByQuantite: (state) => {
      state.fertilisations.sort((a, b) => {
        return a.quantite - b.quantite;
      });
    },
    sortByCout: (state) => {
      state.fertilisations.sort((a, b) => {
        return a.cout - b.cout;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFertilisations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFertilisations.fulfilled, (state, action) => {
        state.loading = false;
        state.fertilisations = action.payload;
      })
      .addCase(fetchFertilisations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get one Fertilisation
      .addCase(getFertilisation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFertilisation.fulfilled, (state, action) => {
        state.loading = false;
        state.fertilisations.push(action.payload);
      })
      .addCase(getFertilisation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create
      .addCase(createFertilisation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFertilisation.fulfilled, (state, action) => {
        state.loading = false;
        state.fertilisations.push(action.payload);
      })
      .addCase(createFertilisation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update
      .addCase(updateFertilisation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFertilisation.fulfilled, (state, action) => {
        state.loading = false;
        state.fertilisations = state.fertilisations.map((element) =>
          element.id === action.payload.id
            ? { ...element, ...action.payload }
            : element
        );
      })
      .addCase(updateFertilisation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete
      .addCase(deleteFertilisation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFertilisation.fulfilled, (state, action) => {
        state.loading = false;
        state.fertilisations = state.fertilisations.filter(
          (Fertilisation) => Fertilisation.id !== action.payload
        );
      })
      .addCase(deleteFertilisation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { sortByDate, sortByCout, sortByTypeDengrais, sortByQuantite } =
  fertilisationSlice.actions;
export default fertilisationSlice.reducer;
