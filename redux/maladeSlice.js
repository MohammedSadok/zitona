import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from "../constants/ApiUrl";

const initialState = {
  malades: [],
  listMaladies: [],
  loading: false,
  error: null,
  traitement: [],
};

const URL = ApiUrl + "/parcelles-malades";
export const fetchMalades = createAsyncThunk(
  "malades/fetchMalades",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        ApiUrl + "/parcelles-malades/parcelle/" + data.id,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data.data !== null ? response.data.data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchListMaladie = createAsyncThunk(
  "malades/fetchListMalades",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(ApiUrl + "/maladies", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchTraitementPhytosanitaires = createAsyncThunk(
  "malades/fetchTraitementPhytosanitaires",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        ApiUrl + "/traitements_phytosanitaire/maladie/" + data.id,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      return response.data.data !== null ? response.data.data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMalade = createAsyncThunk(
  "malades/getMalade",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(`${URL}/${data.id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMalade = createAsyncThunk(
  "malades/deleteMalade",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
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

export const createMalade = createAsyncThunk(
  "malades/createMalade",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(URL, data.malade, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data.data;
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
      const response = await axios.put(`${URL}/${data.malade.id}`, data.malade, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const maladeSlice = createSlice({
  name: "malades",
  initialState,
  reducers: {
    sortByDate: (state) => {
      state.malades.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    sortByMaladie: (state) => {
      state.malades.sort((a, b) => {
        const maladieA = a.maladie.nom.toUpperCase();
        const maladieB = b.maladie.nom.toUpperCase();
        if (maladieA < maladieB) {
          return -1;
        }
        if (maladieA > maladieB) {
          return 1;
        }
        return 0;
      });
    },
  },
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

      //list Maladies
      .addCase(fetchListMaladie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListMaladie.fulfilled, (state, action) => {
        state.loading = false;
        state.listMaladies = action.payload;
      })
      .addCase(fetchListMaladie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //traitement
      .addCase(fetchTraitementPhytosanitaires.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTraitementPhytosanitaires.fulfilled, (state, action) => {
        state.loading = false;
        state.traitement = action.payload;
      })
      .addCase(fetchTraitementPhytosanitaires.rejected, (state, action) => {
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
export const { sortByDate, sortByMaladie } = maladeSlice.actions;
export default maladeSlice.reducer;
