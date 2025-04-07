import {createSlice} from '@reduxjs/toolkit';

interface userState {
  info: Object;
  isOpenFirstTime: boolean;
  languageCode: string;
}

const initialState: userState = {
  info: {},
  isOpenFirstTime: true,
  languageCode: 'en',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.info = action.payload;
    },
    removeUser: state => {
      state.info = {};
    },
    isOpenFirstTime: (state, action) => {
      state.isOpenFirstTime = action.payload;
    },

    languageCode: (state, action) => {
      state.languageCode = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
