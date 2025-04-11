import {createSlice} from '@reduxjs/toolkit';
import {RESULTS, PERMISSIONS} from 'react-native-permissions';

// Define the type for permissionStatus
type PermissionStatus = keyof typeof RESULTS;

const initialState: {status: PermissionStatus} = {
  status: 'BLOCKED', // Default value from RESULTS
};

export const locationPermissionSlice = createSlice({
  name: 'locationPermission',
  initialState,
  reducers: {
    setPermissionStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {setPermissionStatus} = locationPermissionSlice.actions;
export const locationPermissionReducer = locationPermissionSlice.reducer;
