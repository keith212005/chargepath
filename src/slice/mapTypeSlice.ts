import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MapType} from 'react-native-maps';

type MapTypeState = {
  mapType: {
    index: number;
    type: MapType;
  };
  showTraffic: boolean;
  showScale: boolean;
};

const initialState: MapTypeState = {
  mapType: {
    index: 0,
    type: 'standard',
  },
  showTraffic: true,
  showScale: true,
};

const mapTypes = ['standard', 'satellite', 'hybrid'];

const mapTypeSlice = createSlice({
  name: 'mapType',
  initialState,
  reducers: {
    setMapType: (state, action: PayloadAction<number>) => {
      const mapType = mapTypes[action.payload] as MapType;
      state.mapType.index = action.payload;
      state.mapType.type = mapType;
    },
    setShowTraffic: (state, action: PayloadAction<boolean>) => {
      state.showTraffic = action.payload;
    },
    setShowScale: (state, action: PayloadAction<boolean>) => {
      state.showScale = action.payload;
    },
  },
});

export const {setMapType, setShowTraffic, setShowScale} = mapTypeSlice.actions;
export const mapTypeReducer = mapTypeSlice.reducer;
