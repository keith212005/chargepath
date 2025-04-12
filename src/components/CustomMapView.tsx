import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import MapView, {MapViewProps, Marker} from 'react-native-maps';
import {useAppDispatch, useAppSelector} from '@store';
import {
  clearSelectedStationAsync,
  getChargingStations,
  setCurrentRegion,
  setSelectedStationAsync,
} from '@slice';
import {useAppTheme} from '@hooks';
import {debounce} from 'lodash';
import {BottomSheetWrapper, BottomSheetWrapperRef} from '@components';
import {
  calculateDistance,
  getPlugScore,
  getPlugTypes,
  getTotalChargers,
  useGlobalStyles,
  shouldUpdateRegion,
} from '@utils';
import {Icon} from '@rneui/themed';

export const CustomMapViewComponent = forwardRef<MapView, MapViewProps>(
  (props, ref) => {
    const {colors} = useAppTheme();
    const dispatch = useAppDispatch();
    const globalStyle = useGlobalStyles();
    const bottomSheetRef = useRef<BottomSheetWrapperRef>(null);
    const mapPressedRef = useRef(false);
    const markerPressedRef = useRef(false);

    // Redux state selectors
    const region = useAppSelector(state => state.region);
    const {status} = useAppSelector(state => state.locationPermission);
    const {mapType, showTraffic, showScale} = useAppSelector(
      state => state.mapType,
    );
    const {data: stationList, loading} = useAppSelector(
      state => state.stationList,
    );
    const {selectedStation}: any = useAppSelector(
      state => state.selectedStation,
    );

    const regionRef = useRef(region);

    useEffect(() => {
      console.log('useEffect in CustomMapView called......');

      if (!region) return;

      if (status === 'GRANTED') callChargingStationsApi();

      const timeout = setTimeout(() => {}, 500); // Debounce to avoid rapid API calls

      return () => clearTimeout(timeout);
    }, [region]); // Effect to fetch stations when region or permission changes

    // Fetch charging stations
    const callChargingStationsApi = useCallback(() => {
      dispatch(
        getChargingStations({
          latitude: region?.latitude ?? 0,
          longitude: region?.longitude ?? 0,
        }),
      );
    }, [region]);

    // Handle region change
    const handleRegionChangeComplete = useCallback(
      debounce(newRegion => {
        //
        if (shouldUpdateRegion(regionRef.current, newRegion)) {
          console.log('Debounced onRegionChangeComplete:', newRegion);
          regionRef.current = newRegion;
          dispatch(setCurrentRegion(newRegion));
        }
      }, 200),
      [dispatch],
    );

    // Handle marker press
    const handleMarkerPress = useCallback(
      (station: any) => {
        markerPressedRef.current = true;
        dispatch(setSelectedStationAsync(station)).then(() =>
          bottomSheetRef.current?.expand(),
        );
      },
      [dispatch],
    );

    // Handle map press
    const handleMapPress = useCallback(() => {
      setTimeout(() => {
        if (!markerPressedRef.current && selectedStation) {
          dispatch(clearSelectedStationAsync());
          bottomSheetRef.current?.close();
        }
        markerPressedRef.current = false;
        mapPressedRef.current = false;
      }, 10); // Slight delay to allow onSelect to run first
    }, [dispatch, selectedStation]);

    // Render markers
    const renderMarkers = useMemo(() => {
      return stationList?.map((station: any) => {
        const {Latitude: lat, Longitude: lng} = station?.AddressInfo || {};
        if (!lat || !lng) return null;

        return (
          <Marker
            key={station.UUID}
            coordinate={{latitude: lat, longitude: lng}}
            onPress={() => handleMarkerPress(station)}
          />
        );
      });
    }, [stationList, handleMarkerPress]);

    // Selected station card
    const SelectedStationCard = () => {
      let distance, plugScore, plugTypes, totalChargers;

      if (selectedStation) {
        distance = calculateDistance(selectedStation);
        plugTypes = getPlugTypes(selectedStation.Connections);
        plugScore = getPlugScore(selectedStation);
        totalChargers = getTotalChargers(selectedStation.Connections);
      }

      return (
        <View style={[{}]}>
          {selectedStation ? (
            <View style={{paddingHorizontal: 10}}>
              {/* First row */}
              <View
                style={[
                  globalStyle.layoutDirection('row', 'space-between', 'center'),
                  {backgroundColor: 'red'},
                ]}>
                <Text style={[styles.stationTitle, {}]}>
                  {selectedStation?.AddressInfo?.Title || 'No Title'}
                </Text>
                <Icon
                  name="close"
                  type="ionicon"
                  size={30}
                  color={colors.gray}
                  style={{flex: 2}}
                  onPress={() => {
                    dispatch(clearSelectedStationAsync());
                    bottomSheetRef.current?.close();
                  }}
                />
              </View>

              {/* Second Row */}
              <View
                style={[
                  globalStyle.layoutDirection('row', 'space-between', 'center'),
                ]}>
                <Text style={styles.stationAddress}>Distance:{distance}</Text>
                <Text style={styles.stationAddress}>{plugScore} PlugScore</Text>
              </View>

              {/* Second Row */}
              <View
                style={[
                  globalStyle.layoutDirection('row', 'space-between', 'center'),
                ]}>
                <Text style={styles.stationAddress}>{plugTypes}</Text>
                <Text style={styles.stationAddress}>{totalChargers} Plugs</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.noStationText}>No Station Selected</Text>
          )}
        </View>
      );
    };

    // Render loading state
    if (!stationList) {
      return <Text>No Stations Found</Text>;
    }

    return (
      <View style={styles.container}>
        {/* MapView */}
        <MapView
          ref={ref}
          style={StyleSheet.absoluteFillObject}
          mapType={mapType.type}
          showsTraffic={showTraffic}
          showsScale={showScale}
          region={region || undefined}
          showsUserLocation={true}
          onRegionChangeComplete={handleRegionChangeComplete}
          onPress={handleMapPress}
          {...props}>
          {renderMarkers}
        </MapView>

        {/* Loader */}
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.text} />
          </View>
        )}

        {/* Bottom Sheet */}
        <BottomSheetWrapper
          ref={bottomSheetRef}
          index={-1}
          snapPoints={['27%']}
          enablePanDownToClose={true}
          handleStyle={{borderRadius: 20}}
          handleIndicatorStyle={{height: 0, width: 0}}
          detached={true}
          containerStyle={{marginHorizontal: 20}}
          backgroundStyle={[{borderRadius: 10, marginBottom: 40}]}>
          <SelectedStationCard />
        </BottomSheetWrapper>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  stationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stationAddress: {
    fontSize: 16,
    marginBottom: 10,
  },
  stationDetails: {
    fontSize: 14,
    color: 'gray',
  },
  noStationText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export const CustomMapView = memo(CustomMapViewComponent);
