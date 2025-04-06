import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '@screens';
import {BottomTabNavigator} from './bottomTabNavigator';
import {useNetworkStatus} from '@hooks';
import {useAppSelector} from '@store';
import {LightTheme, MyDarkTheme} from '@constants';

const Stack = createNativeStackNavigator();

export const AppContainer = () => {
  useNetworkStatus(); // starts network status listener
  const isDark = useAppSelector(state => state.user.isDarkTheme);

  return (
    <NavigationContainer theme={isDark ? MyDarkTheme : LightTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
