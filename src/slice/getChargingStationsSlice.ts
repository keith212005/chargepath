import {OPEN_CH_API_PARAMS} from '@constants';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: false,
  error: null as string | null,
};

// Async thunk to fetch charging stations
export const getChargingStations = createAsyncThunk(
  'getChargingStations/fetch',
  async (
    {latitude, longitude}: {latitude: number; longitude: number},
    thunkAPI,
  ) => {
    const BASE_URL = process.env.OPEN_CHARGE_MAP_BASE_URL as string;

    if (!latitude || !longitude) {
      console.error('Invalid latitude or longitude');
      return thunkAPI.rejectWithValue('Invalid latitude or longitude');
    }

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          latitude,
          longitude,
          ...OPEN_CH_API_PARAMS,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching charging stations:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const getChargingStationsSlice = createSlice({
  name: 'getChargingStations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getChargingStations.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChargingStations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getChargingStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export const getChargingStationsReducer = getChargingStationsSlice.reducer;
