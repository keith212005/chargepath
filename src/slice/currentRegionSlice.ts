import Geolocation from '@react-native-community/geolocation';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

type TinitialRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const initialRegion = null as TinitialRegion | null;
// Async thunk to get the initial region
export const getInitialRegion = createAsyncThunk(
  'currentRegion/getInitialRegion',
  async (_, {rejectWithValue}) => {
    return new Promise<TinitialRegion>((resolve, reject) => {
      console.log('Geolocation called...');

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          resolve({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        error => {
          console.warn('Error getting location', error);
          reject(new Error('Failed to get location')); // Reject with an error
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  },
);

export const currentRegionSlice = createSlice({
  name: 'currentRegion',
  initialState: initialRegion,
  reducers: {
    setCurrentRegion: (state, action) => {
      return {...state, ...action.payload}; // Update state immutably
    },
  },
  extraReducers: builder => {
    builder.addCase(getInitialRegion.fulfilled, (state, action) => {
      return {...state, ...action.payload}; // Update state immutably
    });
    builder.addCase(getInitialRegion.rejected, (state, action) => {
      console.warn('Failed to fetch initial region:', action.payload);
    });
  },
});

export const {setCurrentRegion} = currentRegionSlice.actions;
export const currentRegionReducer = currentRegionSlice.reducer;
