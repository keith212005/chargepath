import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BookmarksScreen, MapScreen, MeScreen, TripsScreen} from '@screens';
import {Icon} from '@rneui/themed';
import {useGlobalStyles} from '@utils';
import {useTheme} from '@react-navigation/native';
import {_colorDark, _colorLight} from '@constants';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const globalStyle = useGlobalStyles();
  const theme = useTheme();
  const {colors} = theme;

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
          tabBarIcon: ({focused, size}) => {
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
            console.log(colors.text);

            return (
              <Icon
                name={iconName}
                type={iconType}
                color={colors.text}
                size={size}
              />
            );
          },
          tabBarLabel: () => {
            return (
              <Text style={[globalStyle.textStyle('_9', colors.text, 'U_MED')]}>
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
      screenOptions={{
        tabBarStyle: {borderTopColor: '#8E8E93'},
      }}>
      {renderTab('Map', MapScreen, 'map', 'ionicons')}
      {renderTab('Trips', TripsScreen, 'car-alt', 'font-awesome-5')}
      {renderTab('Bookmarks', BookmarksScreen, 'bookmark', 'font-awesome')}
      {renderTab('Me', MeScreen, 'user-circle-o', 'font-awesome')}
    </Tab.Navigator>
  );
};
