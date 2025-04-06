import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-gesture-handler';

export const MapInformationBody = () => {
  const MapLayers = () => {
    return (
      <View>
        <Text>Map Layers</Text>
      </View>
    );
  };

  const MapLegends = () => {
    return (
      <View>
        <Text>Map Legends</Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <MapLayers />
      <MapLegends />
    </View>
  );
};
