import React from 'react';
import {Platform, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BookmarksScreen, MapScreen, MeScreen, TripsScreen} from '@screens';
import {Icon} from '@rneui/themed';
import {useGlobalStyles} from '@utils';
import {useAppTheme} from '@hooks';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const globalStyle = useGlobalStyles();
  const {colors} = useAppTheme();

  const renderTab = (
    name: string,
    component: React.ComponentType<any>,
    iconName: string,
    iconType?: string,
  ) => {
    return (
      <Tab.Screen
        options={{
          // animation: 'fade',
          headerShown: name === 'Map' ? false : true,
          tabBarIcon: ({focused, size}) => {
            let iconColor = focused ? colors.text : colors.icon;

            switch (name) {
              case 'Map':
                iconName = focused ? 'map' : 'map-outline';
                iconType = 'ionicon';
                break;
              case 'Trips':
                iconName = focused ? 'car-sport' : 'car-sport-outline';
                iconType = 'ionicon';
                size = 29;
                break;
              case 'Bookmarks':
                iconName = focused ? 'bookmark' : 'bookmark-o';
                iconType = 'font-awesome';
                break;
              case 'Me':
                iconName = focused ? 'person' : 'person-outline';
                iconType = 'ionicon';
                break;
            }
            return (
              <Icon
                name={iconName}
                type={iconType}
                color={iconColor}
                size={size}
              />
            );
          },
          tabBarStyle: {height: Platform.OS === 'ios' ? 90 : 60},
          tabBarLabel: ({focused}) => {
            let textColor = focused ? colors.text : colors.icon;
            return (
              <Text style={[globalStyle.textStyles('labelSmall', textColor)]}>
                {name}
              </Text>
            );
          },
        }}
        name={name}
        component={component}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{tabBarStyle: {borderTopColor: '#8E8E93'}}}
      backBehavior="order">
      {renderTab('Map', MapScreen, 'map', 'ionicons')}
      {renderTab('Trips', TripsScreen, 'car-alt', 'font-awesome-5')}
      {renderTab('Bookmarks', BookmarksScreen, 'bookmark', 'font-awesome')}
      {renderTab('Me', MeScreen, 'user-circle-o', 'font-awesome')}
    </Tab.Navigator>
  );
};
