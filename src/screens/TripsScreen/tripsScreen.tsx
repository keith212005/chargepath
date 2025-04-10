import React from 'react';
import {Text, View} from 'react-native';
import {useGlobalStyles} from '@utils';
import {useAppTheme} from '@hooks';
import {counter, resetCounter, usePersistedCounter} from '@signals';
import {Button} from '@rneui/themed';

export const TripsScreen = () => {
  const globalStyle = useGlobalStyles();
  const {colors} = useAppTheme();

  usePersistedCounter(); // always put this hook at the end of other hooks to avoid side effects of other hooks like useEffect

  return (
    <View
      style={[
        globalStyle.layoutDirection('column', 'center', 'center'),
        {flex: 1, backgroundColor: colors.background},
      ]}>
      <Text style={globalStyle.textStyle('_18', colors.text, 'U_BOLD')}>
        Counter:{counter}
      </Text>
      <Button
        title="Increment"
        onPress={() => {
          counter.value++;
        }}
      />
      <Button
        title="Reset Counter"
        onPress={() => {
          resetCounter();
        }}
      />
    </View>
  );
};
