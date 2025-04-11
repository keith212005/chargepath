import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import MapView, {MapViewProps, Marker} from 'react-native-maps';
import {useAppDispatch, useAppSelector} from '@store';
import {Text} from 'react-native';
import {getChargingStations, setCurrentRegion} from '@slice';
import {View} from 'react-native';
import {useAppTheme} from '@hooks';
import {debounce} from 'lodash';

export const CustomMapViewComponent = forwardRef<MapView, MapViewProps>(
  (props, ref) => {
    const {colors} = useAppTheme();
    const dispatch = useAppDispatch();
    const region = useAppSelector(state => state.region);
    const {status} = useAppSelector(state => state.locationPermission);
    const {mapType, showTraffic, showScale} = useAppSelector(
      state => state.mapType,
    );
    const {data: stationList, loading} = useAppSelector(
      state => state.stationList,
    );

    const callChargingStationsApi = () => {
      dispatch(
        getChargingStations({
          latitude: region?.latitude ?? 0,
          longitude: region?.longitude ?? 0,
        }),
      );
    };

    useEffect(() => {
      if (!region) return;

      const timeout = setTimeout(() => {
        if (status === 'GRANTED') {
          callChargingStationsApi();
        }
      }, 500); // debounce to avoid rapid fire

      return () => clearTimeout(timeout);
    }, [region]);

    const handleRegionChangeComplete = useCallback(
      debounce(region => {
        console.log('Debounced onRegionChangeComplete:', region);
        dispatch(setCurrentRegion(region));
      }, 200), // 500ms debounce
      [dispatch],
    );

    const renderMarkers = useMemo(() => {
      return stationList?.map((station: any) => {
        const {
          Latitude: lat,
          Longitude: lng,
          Title,
          AddressLine1,
        } = station?.AddressInfo || {};

        if (!lat || !lng) return null;

        return (
          <Marker
            key={station.UUID}
            coordinate={{latitude: lat, longitude: lng}}
            title={Title}
            description={AddressLine1}
          />
        );
      });
    }, [stationList]);

    if (!stationList) {
      return <Text>No Stations Found</Text>;
    }

    console.log('CustomMapView render.......');

    return (
      <View style={styles.container}>
        {/* MapView in the background */}
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

        {/* Loader in the foreground */}
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.text} />
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
  },
});

export const CustomMapView = memo(CustomMapViewComponent);
