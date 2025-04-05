import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '@screens';
import {BottomTabNavigator} from './bottomTabNavigator';

const Stack = createNativeStackNavigator();

export const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
