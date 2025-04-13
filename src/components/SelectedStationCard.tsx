import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';
import {useAppTheme} from '@hooks';
import {useAppSelector} from '@store';
import {
  calculateDistance,
  getPlugTypes,
  getPlugScore,
  getTotalChargers,
  useGlobalStyles,
} from '@utils';

interface SelectedStationCardProps {
  onCardClose: () => void;
}

export const SelectedStationCard = (props: SelectedStationCardProps) => {
  const {onCardClose} = props;
  const {selectedStation}: any = useAppSelector(state => state.selectedStation);
  const globalStyle = useGlobalStyles();
  const {colors} = useAppTheme();

  if (!selectedStation) {
    return <Text style={styles.noStationText}>No Station Selected</Text>;
  }

  const distance = calculateDistance(selectedStation);
  const plugTypes = getPlugTypes(selectedStation.connections ?? []);
  const plugScore = getPlugScore(selectedStation ?? {});
  const chargerCount = getTotalChargers(selectedStation.connections ?? []);
  const totalChargers = `${chargerCount} Plug${chargerCount === 1 ? '' : 's'}`;
  const title = selectedStation?.addressInfo?.title || 'No Title';

  return (
    <View
      style={{
        paddingHorizontal: 10,
        backgroundColor: colors.card,
        borderRadius: 10,
      }}>
      {/* Title and Close */}
      <View
        style={[
          globalStyle.layoutDirection('row', 'space-between', 'flex-start'),
          {paddingBottom: 12},
        ]}>
        <Text
          style={[globalStyle.textStyle('_20', 'text', 'U_BOLD'), {flex: 9}]}>
          {title}
        </Text>
        <TouchableOpacity style={{flex: 1}} onPress={onCardClose}>
          <Icon
            name="closecircle"
            type="antdesign"
            size={26}
            color={colors.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Distance and PlugScore */}
      <View
        style={[
          globalStyle.layoutDirection('row', 'space-between', 'flex-start'),
          {paddingVertical: 8},
        ]}>
        <Text
          style={[globalStyle.textStyle('_16', 'text', 'U_REG'), {flex: 6}]}>
          Distance {distance}
        </Text>
        <View style={styles.plugScoreContainer}>
          <Text
            style={[
              globalStyle.textStyle('_12', 'white', 'U_BOLD'),
              styles.plugScoreText,
            ]}>
            {plugScore} PlugScore
          </Text>
        </View>
      </View>

      {/* Plug Types and Total Chargers */}
      <View
        style={[
          globalStyle.layoutDirection('row', 'space-between', 'flex-start'),
          {paddingTop: 5},
        ]}>
        <Text
          style={[globalStyle.textStyle('_16', 'text', 'U_BOLD'), {flex: 5}]}>
          {plugTypes}
        </Text>
        <Text style={styles.stationAddress}>{totalChargers}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stationAddress: {
    fontSize: 16,
    marginBottom: 10,
  },
  noStationText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
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
