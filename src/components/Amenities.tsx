import {AMENITIES_LIST} from '@constants';
import {useAppTheme} from '@hooks';
import {Icon} from '@rneui/themed';
import {useGlobalStyles} from '@utils';
import React from 'react';
import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import {vs} from 'react-native-size-matters';

const NUM_COLUMNS = 3;

const formatData = (data: any[], numColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  const numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

  if (numberOfElementsLastRow !== 0 && numberOfElementsLastRow !== numColumns) {
    for (let i = 0; i < numColumns - numberOfElementsLastRow; i++) {
      data.push({empty: true});
    }
  }
  return data;
};

export const Amenities = () => {
  const globalStyles = useGlobalStyles();
  const {colors} = useAppTheme();
  const [amenitiesList, setAmenitiesList] = React.useState(AMENITIES_LIST);

  const renderItem = ({item}: {item: (typeof AMENITIES_LIST)[number]}) => {
    let selectedItemColor = item.isSelected ? colors.background : colors.icon;
    let selectedItemBackgroundColor = item.isSelected
      ? colors.text
      : colors.card;
    if (item.id > AMENITIES_LIST.length) {
      return <View style={styles.emptyItem} />;
    }
    return (
      <Pressable
        style={[
          styles.itemContainer,
          {
            backgroundColor: selectedItemBackgroundColor,
            borderColor: colors.lightGray,
          },
        ]}
        onPress={() => {
          setAmenitiesList(prev =>
            prev.map(amenity =>
              amenity.id === item.id
                ? {...amenity, isSelected: !amenity.isSelected}
                : amenity,
            ),
          );
        }}>
        <Icon
          name={item.iconName}
          type={item.iconType}
          size={item.iconSize}
          color={selectedItemColor}
        />
        <Text
          style={[
            globalStyles.textStyles('labelSmall', selectedItemColor),
            {marginTop: 5},
          ]}>
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <>
      <Text
        style={[
          globalStyles.textStyles('labelLarge', colors.text),
          {marginVertical: vs(10), marginTop: vs(40)},
        ]}>
        Amenities
      </Text>

      <FlatList
        data={formatData([...amenitiesList], NUM_COLUMNS)}
        keyExtractor={(item, index) => index.toString()}
        numColumns={NUM_COLUMNS}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={{
          borderWidth: 0.2,
          borderColor: colors.lightGray,
          borderRadius: 5,
          // overflow: 'hidden',
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    paddingVertical: 20,
    borderWidth: 0.2,
    borderColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyItem: {},
});
