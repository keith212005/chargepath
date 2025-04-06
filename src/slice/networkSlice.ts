import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import NetInfo from '@react-native-community/netinfo';

interface NetworkState {
  isOnline: boolean;
}

const initialState: NetworkState = {
  isOnline: true,
};

export const checkIsOnline = createAsyncThunk(
  'network/check',
  async (_, {rejectWithValue}) => {
    try {
      const state = await NetInfo.fetch();
      return state.isConnected ?? true; // fallback to true
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworkStatus: (state, action) => {
      state.isOnline = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(checkIsOnline.fulfilled, (state, action) => {
      state.isOnline = action.payload;
    });
    builder.addCase(checkIsOnline.rejected, state => {
      state.isOnline = false;
    });
  },
});

export const {setNetworkStatus} = networkSlice.actions;
export const networkReducer = networkSlice.reducer;
