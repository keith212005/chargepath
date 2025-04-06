import React, {use} from 'react';
import {Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, useAppSelector} from '@store';
import {increment, userAction} from '@slice';
import {Button} from '@rneui/themed';
import {NoInternetView} from '@components';
import {FONTS} from '@constants';
import {useGlobalStyles} from '@utils';
import {useCustomTheme} from '@hooks';

export const TripsScreen = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const isOnline = useAppSelector(state => state?.network?.isOnline);
  const globalStyle = useGlobalStyles();
  const {colors, isDark} = useCustomTheme();

  if (!isOnline) {
    return <NoInternetView />;
  }
  return (
    <View
      style={[
        globalStyle.layoutDirection('column', 'center', 'center'),
        {flex: 1, backgroundColor: colors.background},
      ]}>
      <Text style={{fontFamily: 'Inter-Bold', fontSize: 30}}>
        Count: {count}
      </Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button
        title="Change theme"
        onPress={() => {
          dispatch(userAction.isDarkTheme(!isDark)); // Dispatch action to toggle dark mode
        }}
      />
    </View>
  );
};
