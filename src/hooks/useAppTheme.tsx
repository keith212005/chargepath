// hooks/useAppTheme.ts
import {useAppSelector} from '@store';
import {MyDarkTheme, LightTheme} from '@constants';

export const useAppTheme = () => {
  const currentTheme = useAppSelector(state => state.theme.currentTheme); // 'light' | 'dark'

  const isDark = currentTheme === 'dark';
  const theme = isDark ? MyDarkTheme : LightTheme;

  return {theme, colors: theme.colors, isDark};
};
