import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useAppTheme, useLocationPermissionAndRegion} from '@hooks';
import {useGlobalStyles} from '@utils';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {GreenChargerMarker, OrangeChargerMarker} from '@assets';
import {OPEN_CH_API_PARAMS} from '@constants';
import {Divider} from '@rneui/themed';

export const AvailableStations = () => {
  const {colors} = useAppTheme();
  const globalStyles = useGlobalStyles();
  const [list, setList] = useState([]);
  const {region, permissionStatus, loading, refresh, openAppSettings} =
    useLocationPermissionAndRegion();
  const BASE_URL = process.env.OPEN_CHARGE_MAP_BASE_URL as string;

  console.log(region);

  useEffect(() => {
    const fetchNearbyStations = async (latitude: any, longitude: any) => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            latitude, // your current location
            longitude,
            ...OPEN_CH_API_PARAMS,
          },
        });
        setList(response.data);
      } catch (error) {
        console.error('Failed to fetch nearby stations', error);
        return [];
      }
    };

    fetchNearbyStations(region?.latitude, region?.longitude);
  }, [region]);

  const getPlugScore = (station: any): string => {
    const connections = station.Connections || [];
    if (connections.length === 0) return '0.0';

    let totalScore = 0;

    connections.forEach((conn: any) => {
      let score = 0;

      if (conn.PowerKW >= 100) score += 5;
      else if (conn.PowerKW >= 50) score += 4;
      else if (conn.PowerKW >= 22) score += 3;
      else if (conn.PowerKW >= 7) score += 2;
      else score += 1;

      if (conn.Level?.IsFastChargeCapable) score += 2;

      if (conn.CurrentType?.Title?.includes('DC')) score += 1;

      if (conn.StatusType?.Title === 'Operational') score += 1;

      totalScore += score;
    });

    const averageScore = totalScore / connections.length;
    return Math.min(10, averageScore).toFixed(1);
  };

  const renderListItem = ({item}: any) => {
    const totalChargers = item.Connections?.reduce(
      (sum: number, conn: any) => sum + (conn.Quantity || 0),
      0,
    );

    const plugTypes = [
      ...new Set(
        item.Connections.map((conn: any) => conn.ConnectionType?.Title).filter(
          Boolean,
        ),
      ),
    ].join(', ');

    const isMiles = item.AddressInfo?.DistanceUnit === 1;
    const rawDistance = item.AddressInfo?.Distance || 0;
    const distanceInKm = isMiles ? rawDistance * 1.60934 : rawDistance;
    const distanceDisplay =
      distanceInKm < 1
        ? `${Math.round(distanceInKm * 1000)} m`
        : `${distanceInKm.toFixed(1)} km`;

    const hasFastCharger = item.Connections?.some(
      (conn: any) => conn.Level?.IsFastChargeCapable === true,
    );

    const plugScore = getPlugScore(item);

    return (
      <>
        <View
          key={item.UUID}
          style={[
            globalStyles.layoutDirection('row', 'center', 'center'),
            {padding: 10, backgroundColor: colors.card},
          ]}>
          <View
            style={[
              {flex: 1.5},
              globalStyles.layoutDirection('row', 'center', 'center'),
            ]}>
            {hasFastCharger ? (
              <OrangeChargerMarker width={30} height={50} />
            ) : (
              <GreenChargerMarker width={30} height={50} />
            )}
          </View>
          <View style={{flex: 8.5}}>
            <Text style={globalStyles.textStyle('_15', 'text', 'U_BOLD')}>
              {item.AddressInfo.Title}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 7}}>
                <Text
                  style={[
                    globalStyles.textStyle('_15', 'text', 'U_BOLD'),
                    {paddingVertical: 10},
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
              <View
                style={{
                  flex: 3,
                  backgroundColor: 'green',
                  alignSelf: 'center',
                  borderRadius: 5,
                }}>
                <Text
                  style={[
                    globalStyles.textStyle('_10', 'white', 'U_BOLD'),
                    {alignSelf: 'center', padding: 5},
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
    <View style={{}}>
      {/* Showing available charging stations near by using flatlist */}
      <BottomSheetFlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        data={list}
        renderItem={renderListItem}
      />
    </View>
  );
};
