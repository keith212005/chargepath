import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import MapView, {MapViewProps} from 'react-native-maps';
import {useAppDispatch, useAppSelector} from '@store';
import {
  clearSelectedStationAsync,
  getChargingStations,
  getInitialRegion,
  setCurrentRegion,
  setSelectedStationAsync,
} from '@slice';
import {useAppTheme} from '@hooks';
import {shouldUpdateRegion} from '@utils';
import {CustomMarker} from './CustomMarker';
import debounce from 'lodash/debounce';

export type CustomMapViewProps = {
  onMarkerPress: () => void;
  onMapPress: () => void;
};

export const CustomMapView = (props: CustomMapViewProps & MapViewProps) => {
  const dispatch = useAppDispatch();
  const {colors} = useAppTheme();
  const isInitialRender = useRef(true);
  const mapViewRef = useRef<MapView>(null);
  const mapPressedRef = useRef(false);
  const markerPressedRef = useRef(false);

  // Redux state selectors
  const region = useAppSelector(state => state.region);
  const regionRef = useRef(region || null);
  const {status} = useAppSelector(state => state.locationPermission);
  const {data: stationList, loading} = useAppSelector(
    state => state.stationList,
  );
  const {selectedStation} = useAppSelector(state => state.selectedStation);
  const {mapType, showTraffic, showScale} = useAppSelector(
    state => state.mapType,
  );

  useEffect(() => {
    dispatch(getInitialRegion());
  }, [dispatch]);

  // Fetch charging stations
  const fetchChargingStations = useCallback(() => {
    if (!region || status !== 'GRANTED') return;
    dispatch(
      getChargingStations({
        latitude: region.latitude,
        longitude: region.longitude,
      }),
    );
  }, [dispatch, region, status]);

  // Handle region change
  const handleRegionChangeComplete = useCallback(
    debounce(newRegion => {
      if (isInitialRender.current) {
        isInitialRender.current = false;
        return;
      }

      if (shouldUpdateRegion(regionRef.current, newRegion)) {
        regionRef.current = newRegion;
        dispatch(setCurrentRegion(newRegion));
      }
    }, 500),
    [dispatch],
  );

  // Render markers
  const renderMarkers = useMemo(() => {
    return stationList?.map((station: any) => {
      const {latitude: lat, longitude: lng} = station.addressInfo || {};
      if (!lat || !lng) return null;

      return (
        <CustomMarker
          key={`${station.uuid}-${selectedStation?.uuid === station.uuid}`}
          station={station}
          isSelected={selectedStation?.uuid === station.uuid}
          coordinate={{latitude: lat, longitude: lng}}
          onPress={() => {
            markerPressedRef.current = true;
            dispatch(setSelectedStationAsync(station));
            mapViewRef?.current?.animateToRegion({
              latitude: station.addressInfo.latitude,
              longitude: station.addressInfo.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          }}
        />
      );
    });
  }, [stationList, selectedStation]);

  useEffect(() => {
    fetchChargingStations();
  }, [fetchChargingStations]);

  const onMapPress = useCallback(() => {
    if (!markerPressedRef.current && selectedStation) {
      dispatch(clearSelectedStationAsync()).then(() => {
        props.onMapPress?.();
      });
    }
    markerPressedRef.current = false;
    mapPressedRef.current = false;
  }, [dispatch, selectedStation]);

  if (!region) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={StyleSheet.absoluteFillObject}
        mapType={mapType.type}
        showsTraffic={showTraffic}
        showsScale={showScale}
        showsUserLocation
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        onPress={onMapPress}
        {...props}>
        {renderMarkers}
      </MapView>

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
