import React from 'react';
import {MAP_OPTIONS_LIST} from '@constants';
import {useAppTheme} from '@hooks';
import {IconType} from '@rneui/base';
import {FAB} from '@rneui/themed';
import {useGlobalStyles} from '@utils';
import {View, Text, StyleSheet} from 'react-native';
import {navigate} from '@navigators';
import {FlatList} from 'react-native-gesture-handler';
import {ms, mvs} from 'react-native-size-matters';
import {MapFilterRef, MapFilters} from '@components';

export const MapOptionsList = () => {
  const globalStyles = useGlobalStyles();
  const {colors} = useAppTheme();
  const mapFilterRef = React.useRef<MapFilterRef>(null);

  const renderButton = ({
    id,
    label,
    iconType,
    iconName,
    iconColor,
  }: {
    id: number;
    label: string;
    iconType: IconType;
    iconName: string;
    iconColor: string;
  }) => {
    const handleButtonPress = () => {
      switch (id) {
        case 1:
          navigate('SearchScreen', undefined);
          break;
        case 2:
          console.log('clicked....');
          mapFilterRef.current?.expand();
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          break;
        case 8:
          break;
        case 9:
          break;

        default:
          break;
      }
    };

    return (
      <View
        style={[
          globalStyles.layoutDirection('column', 'center', 'center'),
          styles.buttonContainer,
          {borderBottomColor: colors.gray},
        ]}>
        <FAB
          icon={{name: iconName, type: iconType, color: iconColor}}
          color={colors.card}
          onPress={handleButtonPress}
          style={[styles.shadowContainer, {backgroundColor: colors.background}]}
          containerStyle={{borderWidth: 0.5, borderColor: colors.gray}}
        />
        <Text
          style={[
            globalStyles.textStyles('labelXSmall', 'text'),
            styles.buttonLabel,
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
        keyExtractor={(item, index) => `${item.label}-${index}`}
        renderItem={({item}) =>
          renderButton({
            id: item.id,
            label: item.label,
            iconType: item.iconType,
            iconName: item.iconName,
            iconColor: colors.text,
          })
        }
      />
      {/* All filters button will open MapFilterModal */}

      <MapFilters ref={mapFilterRef} />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: mvs(6, 3),
    paddingVertical: ms(9, 3),
  },
  buttonLabel: {
    marginTop: 5,
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
});
