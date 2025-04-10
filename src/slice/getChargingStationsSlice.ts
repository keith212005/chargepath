import {OPEN_CH_API_PARAMS} from '@constants';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const getChargingStations = createAsyncThunk(
  'getChargingStations/fetch',
  async (
    {latitude, longitude}: {latitude: number; longitude: number},
    thunkAPI,
  ) => {
    const BASE_URL = process.env.OPEN_CHARGE_MAP_BASE_URL as string;
    console.log(BASE_URL, longitude, latitude);

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
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const getChargingStationsSlice = createSlice({
  name: 'getChargingStations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getChargingStations.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getChargingStations.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getChargingStations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as null;
    });
  },
});

export const getChargingStationsReducer = getChargingStationsSlice.reducer;
