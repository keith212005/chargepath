import {ModalWrapperRef} from '@components';
import {useTheme} from '@react-navigation/native';
import {useGlobalStyles} from '@utils';
import React from 'react';
import {View, Text, Pressable} from 'react-native';

export const MapInfomationHeader = () => {
  const globalStyle = useGlobalStyles();
  const theme = useTheme();
  const {colors} = theme;
  const mapInfoRef = React.useRef<ModalWrapperRef>(null);
  return (
    <View
      style={[
        globalStyle.layoutDirection('row', 'center', 'center'),
        {
          paddingVertical: 20,
          borderBottomWidth: 0.2,
          borderColor: colors.text,
          backgroundColor: colors.card,
        },
      ]}>
      <Text style={globalStyle.textStyle('_18', colors.text, 'U_BOLD')}>
        Map Information
      </Text>

      <Pressable
        onPress={() => mapInfoRef?.current?.close()}
        style={{position: 'absolute', right: 20}}>
        <Text style={globalStyle.textStyle('_18', colors.text, 'U_MED')}>
          Close
        </Text>
      </Pressable>
    </View>
  );
};
