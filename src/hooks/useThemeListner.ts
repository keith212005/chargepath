import {setTheme} from '@slice';
import {useAppDispatch} from '@store';
import {useEffect} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';

/**
 * Listens to changes in the device's color scheme, and dispatches an action to
 * update the theme in the store.
 *
 * @returns {void}
 */
export const useThemeListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      (preferences: Appearance.AppearancePreferences) => {
        const theme: ColorSchemeName = preferences.colorScheme;
        dispatch(setTheme(theme ?? 'light'));
      },
    );

    return () => subscription.remove();
  }, [dispatch]);
};
