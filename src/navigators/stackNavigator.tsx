import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '@screens';
import {BottomTabNavigator} from './bottomTabNavigator';
import {useNetworkStatus} from '@hooks';
import {useAppSelector} from '@store';
import {LightTheme, MyDarkTheme} from '@constants';
import {Host} from 'react-native-portalize';

const Stack = createNativeStackNavigator();

export const AppContainer = () => {
  useNetworkStatus(); // starts network status listener
  const isDark = useAppSelector(state => state.user.isDarkTheme);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer theme={isDark ? MyDarkTheme : LightTheme}>
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
