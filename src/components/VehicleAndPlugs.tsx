import React from 'react';
import {
  CCS1Svg,
  CHAdeMOIcon,
  J1772Icon,
  NACSIcon,
  NEMA1450Icon,
  NEMATT30Icon,
  TeslaRoadsterIcon,
  WallOutletIcon,
} from '@assets';
import {PLUG_TYPES} from '@constants';
import {useAppTheme} from '@hooks';
import {useGlobalStyles} from '@utils';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';

const NUM_COLUMNS = 3;

// Format data to ensure the last row is filled with empty items if necessary
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

// Render the icon based on the plug type
const renderIcon = (id: number, color: string) => {
  const icons: any = {
    1: <CCS1Svg size={50} color={color} />,
    2: <CHAdeMOIcon size={50} color={color} />,
    3: <J1772Icon size={50} color={color} />,
    4: <NACSIcon size={50} color={color} />,
    5: <NEMA1450Icon size={50} color={color} />,
    6: <NEMATT30Icon size={50} color={color} />,
    7: <TeslaRoadsterIcon size={50} color={color} />,
    8: <WallOutletIcon size={50} color={color} />,
  };
  return icons[id] || null;
};

export const VehicleAndPlugs = () => {
  const globalStyles = useGlobalStyles();
  const {colors} = useAppTheme();

  // Render each item in the FlatList
  const renderItem = ({item}: any) => {
    if (item.empty) {
      return <View style={styles.emptyItem} />;
    }
    return (
      <View style={[styles.itemContainer, {backgroundColor: colors.card}]}>
        <View style={styles.iconContainer}>
          {renderIcon(item.id, colors.text)}
        </View>
        <Text
          style={[
            globalStyles.textStyles('paragraphXSmall', colors.text),
            styles.itemLabel,
          ]}>
          {item.label}
        </Text>
      </View>
    );
  };

  // Render the header for the FlatList
  const renderHeader = () => (
    <View
      style={[
        styles.headerContainer,
        globalStyles.layoutDirection('row', 'space-between', 'center'),
      ]}>
      <Text style={globalStyles.textStyles('labelMedium', colors.text)}>
        Vehicle
      </Text>
      <TouchableOpacity>
        <Text style={globalStyles.textStyles('labelMedium', colors.text)}>
          Add Vehicle
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text
        style={[
          globalStyles.textStyles('labelLarge', colors.text),
          styles.title,
        ]}>
        Vehicle & Plugs
      </Text>
      <FlatList
        data={formatData([...PLUG_TYPES], NUM_COLUMNS)}
        keyExtractor={(item, index) => index.toString()}
        numColumns={NUM_COLUMNS}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={[
          styles.flatListContainer,
          {borderColor: colors.lightGray},
        ]}
        scrollEnabled={false}
      />
      <Text
        style={[
          globalStyles.textStyles('paragraphXSmall', colors.text),
          {marginTop: 5},
        ]}>
        Your vehicle is used to determine compatible charging station.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  title: {
    paddingBottom: 10,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  flatListContainer: {
    borderWidth: 0.2,
    borderRadius: 5,
  },
  itemContainer: {
    flex: 1,
    borderWidth: 0.2,
    borderColor: 'lightgray',
    paddingVertical: 10,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    flex: 1,
  },
  itemLabel: {
    textAlign: 'center',
  },
  emptyItem: {
    flex: 1,
  },
});
