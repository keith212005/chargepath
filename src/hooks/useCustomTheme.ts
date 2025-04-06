import {MyDarkTheme, LightTheme} from '@constants';
import {useAppSelector} from '@store';
import {useEffect, useState} from 'react';

export const useCustomTheme = () => {
  const [colors, setColor] = useState<
    typeof MyDarkTheme.colors | typeof LightTheme.colors
  >({} as typeof MyDarkTheme.colors);

  const user = useAppSelector(state => state.user);
  const isDark = user.isDarkTheme;

  useEffect(() => {
    setColor(user.isDarkTheme ? MyDarkTheme.colors : LightTheme.colors);
  }, [user.isDarkTheme]);

  return {colors, isDark};
};
