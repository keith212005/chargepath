import {createSlice} from '@reduxjs/toolkit';

interface SelectedStationState {
  selectedStation: any;
}

const initialState: SelectedStationState = {
  selectedStation: null,
};

const selectedStationSlice = createSlice({
  name: 'selectedStation',
  initialState,
  reducers: {
    setSelectedStation: (state, action) => {
      state.selectedStation = action.payload;
    },
    clearSelectedStation: state => {
      state.selectedStation = null;
    },
  },
});

export const setSelectedStationAsync = (station: any) => (dispatch: any) => {
  return new Promise(resolve => {
    dispatch(setSelectedStation(station));
    resolve(station); // Resolve the promise with the station
  });
};

export const clearSelectedStationAsync = () => (dispatch: any) => {
  return new Promise((resolve: any) => {
    dispatch(clearSelectedStation());
    resolve(); // Resolve the promise
  });
};

export const {setSelectedStation, clearSelectedStation} =
  selectedStationSlice.actions;
export const selectedStationReducer = selectedStationSlice.reducer;
