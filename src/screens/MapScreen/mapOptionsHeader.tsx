import {MAP_OPTIONS_LIST} from '@constants';
import {useTheme} from '@react-navigation/native';
import {IconType} from '@rneui/base';
import {FAB} from '@rneui/themed';
import {responsiveWidth, useGlobalStyles} from '@utils';
import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

export const MapOptionsHeader = () => {
  const globalStyles = useGlobalStyles();
  const theme = useTheme();
  const {colors} = theme;

  const renderButton = (
    label: string,
    iconType: IconType,
    iconName: string,
    iconColor: string,
  ) => {
    return (
      <View
        style={[
          globalStyles.layoutDirection('column', 'center', 'center'),
          {paddingHorizontal: responsiveWidth(2)},
        ]}>
        <FAB
          icon={{name: iconName, type: iconType, color: iconColor}}
          color={colors.background}
          onPress={() => {}}
          style={[styles.shadowContainer, {backgroundColor: colors.background}]}
          containerStyle={{borderWidth: 0.2, borderColor: colors.text}}
        />
        <Text
          style={[
            globalStyles.textStyle('_12', 'text', 'U_REG'),
            {marginTop: 5, color: colors.text},
          ]}>
          {label}
        </Text>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={MAP_OPTIONS_LIST}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        renderItem={({item}) => {
          return (
            <>
              {renderButton(
                item.label,
                item.iconType,
                item.iconName,
                colors.text,
              )}
            </>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
