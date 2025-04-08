import React from 'react';
import {View} from 'react-native';
import {useAppSelector} from '@store';
import {NoInternetView} from '@components';
import {useGlobalStyles} from '@utils';
import {useAppTheme} from '@hooks';

export const TripsScreen = () => {
  const isOnline = useAppSelector(state => state.network.isOnline);
  const globalStyle = useGlobalStyles();
  const {colors} = useAppTheme();

  if (!isOnline) {
    return <NoInternetView />;
  }
  return (
    <View
      style={[
        globalStyle.layoutDirection('column', 'center', 'center'),
        {flex: 1, backgroundColor: colors.background},
      ]}></View>
  );
};
