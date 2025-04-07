import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';

export const MapOptionsBody = () => {
  const theme = useTheme();
  const {colors} = theme;

  return (
    <View style={{backgroundColor: 'red', marginTop: 20}}>
      <Text style={{color: colors.text}}>Map Options Body</Text>
    </View>
  );
};
