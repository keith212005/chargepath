import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AppTheme = 'light' | 'dark';

type ThemeState = {
  currentTheme: AppTheme;
};

const initialState: ThemeState = {
  currentTheme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<AppTheme | null>) {
      const theme = action.payload;
      if (theme === 'dark') {
        state.currentTheme = 'dark';
      } else if (theme === 'light') {
        state.currentTheme = 'light';
      } else {
        console.warn('Received invalid theme in reducer:', theme);
      }
    },
  },
});

export const {setTheme} = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
