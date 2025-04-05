import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BookmarksScreen, MapScreen, MeScreen, TripsScreen} from '@screens';
import {Icon} from '@rneui/themed';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const renderTab = (
    name: string,
    component: React.ComponentType<any>,
    iconName: string,
    iconType?: string,
  ) => {
    return (
      <Tab.Screen
        options={{
          headerShown: name === 'Map' ? false : true,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Icon name={iconName} type={iconType} color={color} size={size} />
            );
          },
        }}
        name={name}
        component={component}
      />
    );
  };

  return (
    <Tab.Navigator>
      {renderTab('Map', MapScreen, 'map', 'ionicons')}
      {renderTab('Trips', TripsScreen, 'car-alt', 'font-awesome-5')}
      {renderTab('Bookmarks', BookmarksScreen, 'bookmark', 'font-awesome')}
      {renderTab('Me', MeScreen, 'user-circle-o', 'font-awesome')}
    </Tab.Navigator>
  );
};
