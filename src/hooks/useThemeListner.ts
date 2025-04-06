import {setTheme} from '@slice';
import {useAppDispatch} from '@store';
import {useEffect} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';

export const useThemeListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Set initial theme
    // const currentTheme: ColorSchemeName = Appearance.getColorScheme();
    // dispatch(setTheme(currentTheme ?? 'light'));

    // Listener
    const subscription = Appearance.addChangeListener(
      (preferences: Appearance.AppearancePreferences) => {
        const theme: ColorSchemeName = preferences.colorScheme;
        console.log('Dispatching theme to reducer:', theme);
        dispatch(setTheme(theme ?? 'light'));
      },
    );

    return () => subscription.remove();
  }, [dispatch]);
};
