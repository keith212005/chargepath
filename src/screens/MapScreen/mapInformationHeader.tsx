import {ModalWrapperRef} from '@components';
import {useTheme} from '@react-navigation/native';
import {useGlobalStyles} from '@utils';
import React, {forwardRef} from 'react';
import {View, Text, Pressable} from 'react-native';

// If you want to allow future props, define them here
type MapInformationHeaderProps = {};

export const MapInfomationHeader = forwardRef<
  ModalWrapperRef,
  MapInformationHeaderProps
>((_props, ref) => {
  const globalStyle = useGlobalStyles();
  const theme = useTheme();
  const {colors} = theme;

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
        onPress={() => {
          if (typeof ref !== 'function' && ref?.current) {
            ref.current.close();
          }
        }}
        style={{position: 'absolute', right: 20}}>
        <Text style={globalStyle.textStyle('_18', colors.text, 'U_MED')}>
          Close
        </Text>
      </Pressable>
    </View>
  );
});
