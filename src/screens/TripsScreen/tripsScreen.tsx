import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useGlobalStyles} from '@utils';
import {useAppTheme} from '@hooks';
import {Button} from '@rneui/themed';

export const TripsScreen = () => {
  const globalStyle = useGlobalStyles();
  const {colors} = useAppTheme();
  const [counter, setCounter] = useState(0);

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
          setCounter(counter + 1);
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
