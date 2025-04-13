import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import MapView, {MapViewProps} from 'react-native-maps';
import {useAppDispatch, useAppSelector} from '@store';
import {getChargingStations, setCurrentRegion} from '@slice';
import {useAppTheme} from '@hooks';
import {debounce} from 'lodash';
import {shouldUpdateRegion} from '@utils';
import {CustomMarker} from './CustomMarker';

interface CustomMapViewProps {
  setStation?: () => void;
  onPressMarker?: (station: any) => void;
}

export const CustomMapViewComponent = forwardRef<
  MapView,
  MapViewProps & CustomMapViewProps
>((props, ref) => {
  const dispatch = useAppDispatch();
  const {colors} = useAppTheme();

  // Redux state selectors
  const region = useAppSelector(state => state.region);
  const {status} = useAppSelector(state => state.locationPermission);
  const {data: stationList, loading} = useAppSelector(
    state => state.stationList,
  );
  const {selectedStation} = useAppSelector(state => state.selectedStation);
  const {mapType, showTraffic, showScale} = useAppSelector(
    state => state.mapType,
  );

  const regionRef = useRef(region);

  // Fetch charging stations
  const fetchChargingStations = useCallback(() => {
    if (!region) return;
    dispatch(
      getChargingStations({
        latitude: region.latitude,
        longitude: region.longitude,
      }),
    );
  }, [dispatch, region]);

  // Handle region change
  const handleRegionChangeComplete = useCallback(
    debounce(newRegion => {
      if (shouldUpdateRegion(regionRef.current, newRegion)) {
        regionRef.current = newRegion;
        dispatch(setCurrentRegion(newRegion));
      }
    }, 200),
    [dispatch],
  );

  // Handle marker press
  const handleMarkerPress = useCallback(
    (station: any) => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.animateToRegion({
          latitude: station.addressInfo.latitude,
          longitude: station.addressInfo.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
      props.onPressMarker?.(station);
    },
    [props],
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
          onMarkerPress={handleMarkerPress}
        />
      );
    });
  }, [stationList, selectedStation, handleMarkerPress]);

  // Fetch stations when region changes
  useEffect(() => {
    if (region && status === 'GRANTED') {
      fetchChargingStations();
    }
  }, [region, status, fetchChargingStations]);

  // Render loading state
  if (!stationList) return null;

  return (
    <View style={styles.container}>
      {/* MapView */}
      <MapView
        ref={ref}
        style={StyleSheet.absoluteFillObject}
        mapType={mapType.type}
        showsTraffic={showTraffic}
        showsScale={showScale}
        showsUserLocation
        region={region || undefined}
        onRegionChangeComplete={handleRegionChangeComplete}
        {...props}>
        {renderMarkers}
      </MapView>

      {/* Loader */}
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      )}
    </View>
  );
});

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

export const CustomMapView = memo(CustomMapViewComponent);
