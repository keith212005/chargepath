import React, {forwardRef} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {BottomSheetWrapperRef} from '@components';
import {useAppTheme} from '@hooks';
import {responsiveWidth, useGlobalStyles} from '@utils';

type MapInformationHeaderProps = {};

export const MapInfomationHeader = forwardRef<
  BottomSheetWrapperRef,
  MapInformationHeaderProps
>((_props, ref) => {
  const globalStyle = useGlobalStyles();
  const {colors} = useAppTheme();

  const handleClose = () => {
    if (typeof ref !== 'function' && ref?.current) {
      ref.current.close();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {borderColor: colors.text, backgroundColor: colors.card},
      ]}>
      <Text style={globalStyle.textStyle('_18', colors.text, 'U_BOLD')}>
        Map Information
      </Text>
      <Pressable onPress={handleClose} style={styles.closeButton}>
        <Text style={globalStyle.textStyle('_18', colors.text, 'U_MED')}>
          Close
        </Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 0.2,
  },
  closeButton: {
    position: 'absolute',
    right: responsiveWidth(4),
  },
});
