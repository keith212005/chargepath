import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

export const currentLocationSlice = createSlice({
  name: 'currentLocation',
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const {setCurrentLocation} = currentLocationSlice.actions;
export const currentLocationReducer = currentLocationSlice.reducer;
