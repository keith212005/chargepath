import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

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
