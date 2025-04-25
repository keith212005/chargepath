import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FAB, FABProps} from '@rneui/themed';

interface FloatingButtonProps extends FABProps {
  iconName: string;
  iconType: string;
  iconColor: string;
  iconSize: number;
  backgroundColor: string;
}

export const FloatingButton = (props: FloatingButtonProps) => {
  const {iconName, iconType, iconColor, iconSize, backgroundColor} = props;

  console.log('FloatingButton props:', props);

  return (
    <View style={[styles.shadowContainer, {backgroundColor}]}>
      <FAB
        activeOpacity={0.5}
        icon={{
          name: iconName,
          type: iconType,
          color: iconColor,
          size: iconSize,
        }}
        color={backgroundColor}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    borderRadius: 28,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
