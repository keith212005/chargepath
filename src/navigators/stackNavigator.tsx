import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '@screens';
import {BottomTabNavigator} from './bottomTabNavigator';
import {useNetworkStatus, useThemeListener} from '@hooks';
import {useAppSelector} from '@store';
import {LightTheme, MyDarkTheme} from '@constants';
import {Host} from 'react-native-portalize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export const AppContainer = () => {
  useNetworkStatus(); // starts network status listener
  useThemeListener(); // starts theme listener
  const theme = useAppSelector(state => state.theme.currentTheme);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer theme={theme === 'dark' ? MyDarkTheme : LightTheme}>
        <Host>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={BottomTabNavigator} />
          </Stack.Navigator>
        </Host>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
