import React from 'react';
import {MAP_OPTIONS_LIST} from '@constants';
import {useAppTheme} from '@hooks';
import {IconType} from '@rneui/base';
import {FAB} from '@rneui/themed';
import {responsiveHeight, responsiveWidth, useGlobalStyles} from '@utils';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {navigate} from '@navigators';

export const MapOptionsList = () => {
  const globalStyles = useGlobalStyles();
  const {colors} = useAppTheme();

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
          {
            paddingHorizontal: responsiveWidth(2),
            paddingVertical: responsiveHeight(1.3),
            borderBottomWidth: 0.2,
            borderBottomColor: colors.gray,
            backgroundColor: colors.background,
          },
        ]}>
        <FAB
          icon={{name: iconName, type: iconType, color: iconColor}}
          color={colors.card}
          onPress={() => navigate('SearchScreen', undefined)}
          style={[styles.shadowContainer, {backgroundColor: colors.background}]}
          containerStyle={{borderWidth: 0.5, borderColor: colors.gray}}
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
    <View>
      <FlatList
        data={MAP_OPTIONS_LIST}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          const {label, iconType, iconName} = item;
          return <>{renderButton(label, iconType, iconName, colors.text)}</>;
        }}
      />
    </View>
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
