import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Divider} from '@rneui/themed';
import {useAppTheme} from '@hooks';
import {useAppSelector} from '@store';
import {
  calculateDistance,
  getPlugScore,
  getPlugTypes,
  getTotalChargers,
  hasFastCharger,
  useGlobalStyles,
} from '@utils';
import {GreenChargerMarker, OrangeChargerMarker} from '@assets';
import {BottomSheetFlashList, BottomSheetFlatList} from '@gorhom/bottom-sheet';

export const AvailableStations = () => {
  const {colors} = useAppTheme();
  const globalStyles = useGlobalStyles();
  const stationList = useAppSelector(state => state.stationList.data);

  const renderListItem = ({item}: any) => {
    const totalChargers = getTotalChargers(item.connections);
    const plugTypes = getPlugTypes(item.connections);
    const isFastChargerAvailable = hasFastCharger(item.connections);
    const distanceDisplay = calculateDistance(item);
    const plugScore = getPlugScore(item);

    return (
      <>
        <View
          style={[styles.listItemContainer, {backgroundColor: colors.card}]}>
          <View style={styles.iconContainer}>
            {isFastChargerAvailable ? (
              <OrangeChargerMarker width={30} height={50} />
            ) : (
              <GreenChargerMarker width={30} height={50} />
            )}
          </View>
          <View style={styles.detailsContainer}>
            <Text style={globalStyles.textStyle('_15', 'text', 'U_BOLD')}>
              {item.addressInfo.title}
            </Text>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text
                  style={[
                    globalStyles.textStyle('_15', 'text', 'U_BOLD'),
                    styles.chargerInfo,
                  ]}>
                  {totalChargers} Charger
                </Text>
                <Text style={globalStyles.textStyle('_12', 'text', 'U_REG')}>
                  Plug types: {plugTypes}
                </Text>
                <Text style={globalStyles.textStyle('_12', 'text', 'U_REG')}>
                  Distance: {distanceDisplay}
                </Text>
              </View>
              <View style={styles.plugScoreContainer}>
                <Text
                  style={[
                    globalStyles.textStyle('_10', 'white', 'U_BOLD'),
                    styles.plugScoreText,
                  ]}>
                  {plugScore} PlugScore
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Divider color={colors.gray} />
      </>
    );
  };

  return (
    <BottomSheetFlatList
      bounces={false}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      data={stationList as any}
      renderItem={renderListItem}
    />
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  iconContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 8.5,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoColumn: {
    flex: 7,
  },
  chargerInfo: {
    paddingVertical: 10,
  },
  plugScoreContainer: {
    flex: 3,
    backgroundColor: 'green',
    alignSelf: 'center',
    borderRadius: 5,
  },
  plugScoreText: {
    alignSelf: 'center',
    padding: 5,
  },
});
