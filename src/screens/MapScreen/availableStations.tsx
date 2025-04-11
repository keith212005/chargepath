import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
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

export const AvailableStations = () => {
  const {colors} = useAppTheme();
  const globalStyles = useGlobalStyles();
  const stationList = useAppSelector(state => state.stationList.data);

  const renderListItem = ({item}: any) => {
    const totalChargers = getTotalChargers(item.Connections);
    const plugTypes = getPlugTypes(item.Connections);
    const isFastChargerAvailable = hasFastCharger(item.Connections);
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
              {item.AddressInfo.Title}
            </Text>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text
                  style={[
                    globalStyles.textStyle('_15', 'text', 'U_BOLD'),
                    styles.chargerInfo,
                  ]}>
                  {totalChargers} Charger{totalChargers > 1 ? 's' : ''}
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
    <View style={styles.container}>
      <BottomSheetFlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        data={stationList as any}
        renderItem={renderListItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
