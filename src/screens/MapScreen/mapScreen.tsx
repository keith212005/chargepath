import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView from 'react-native-maps';
import {Portal} from 'react-native-portalize';
import Animated from 'react-native-reanimated';

import {
  FloatingButton,
  BottomSheetWrapper,
  BottomSheetWrapperRef,
  CustomMapView,
  SelectedStationCard,
} from '@components';
import {MapInfomationHeader} from './mapInformationHeader';
import {MapInformationBody} from './mapInformationBody';
import {MapOptionsList} from './mapOptionsList';
import {AvailableStations} from './availableStations';

import {useAppTheme, useBottomSheetAnimation} from '@hooks';
import {useAppDispatch, useAppSelector} from '@store';
import {
  clearSelectedStationAsync,
  getInitialRegion,
  setSelectedStationAsync,
} from '@slice';

export const MapScreen = () => {
  const {colors} = useAppTheme();
  const dispatch = useAppDispatch();

  // Refs for BottomSheets and MapView
  const mapInfoRef = useRef<BottomSheetWrapperRef | null>(null);
  const optionsRef = useRef<BottomSheetWrapperRef | null>(null);
  const selectedStationRef = useRef<BottomSheetWrapperRef>(null);
  const mapRef = useRef<MapView>(null);

  // State and Redux Selectors
  const region = useAppSelector(state => state.region);
  const {status} = useAppSelector(state => state.locationPermission);
  const {animatedMapStyle, handleAnimate} = useBottomSheetAnimation();
  const {selectedStation} = useAppSelector(state => state.selectedStation);

  // Flags for Map and Marker Presses
  const mapPressedRef = useRef(false);
  const markerPressedRef = useRef(false);

  console.log(region);

  // Fetch initial region when location permission is granted
  useEffect(() => {
    if (status === 'GRANTED') {
      dispatch(getInitialRegion());
    }
  }, [status, dispatch]);

  // Handle map press to clear selected station
  const onMapPress = useCallback(() => {
    if (!markerPressedRef.current && selectedStation) {
      dispatch(clearSelectedStationAsync()).then(() => {
        selectedStationRef.current?.close();
      });
    }
    markerPressedRef.current = false;
    mapPressedRef.current = false;
  }, [dispatch, selectedStation]);

  // Handle marker press to select a station
  const handleMarkerPress = useCallback(
    (station: any) => {
      markerPressedRef.current = true;
      setTimeout(() => {
        dispatch(setSelectedStationAsync(station)).then(() => {
          selectedStationRef.current?.expand();
        });
      }, 100);
    },
    [dispatch],
  );

  // Clear selected station and close the bottom sheet
  const clearStationCard = useCallback(() => {
    setTimeout(() => {
      dispatch(clearSelectedStationAsync()).then(() => {
        selectedStationRef.current?.close();
      });
    }, 200);
  }, [dispatch]);

  // Render loading state if region is not available
  if (!region) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Custom MapView */}
      <CustomMapView
        ref={mapRef}
        onPress={onMapPress}
        onPressMarker={handleMarkerPress}
      />

      {/* This View is used for map animation do not remove */}
      <Animated.View style={[styles.mapContainer, animatedMapStyle]}>
        {/* {!selectedStation && <FloatingButtons />} */}
      </Animated.View>

      <Animated.View style={[styles.stachIconStyle, animatedMapStyle]}>
        {!selectedStation && (
          <FloatingButton
            iconName="layer-group"
            iconType="font-awesome-5"
            iconColor={colors.text}
            backgroundColor={colors.card}
            onPress={() => mapInfoRef.current?.expand()}
            accessible
            accessibilityLabel="Open map layers"
          />
        )}
      </Animated.View>

      <Animated.View style={[styles.locationIconStyle, animatedMapStyle]}>
        {!selectedStation && (
          <FloatingButton
            iconName="my-location"
            iconType="material"
            iconColor={colors.text}
            backgroundColor={colors.card}
            onPress={() => mapInfoRef.current?.expand()}
            accessible
            accessibilityLabel="Open map layers"
          />
        )}
      </Animated.View>

      {/* Map Information BottomSheet */}
      <Portal>
        <BottomSheetWrapper
          ref={mapInfoRef}
          snapPoints={[1, '95%']}
          backgroundStyle={styles.sheetBorderRadius}>
          <MapInfomationHeader ref={mapInfoRef} />
          <MapInformationBody />
        </BottomSheetWrapper>
      </Portal>

      {/* Selected Station BottomSheet */}
      <BottomSheetWrapper
        ref={selectedStationRef}
        index={-1} // Start in a closed state
        snapPoints={['37%']}
        enablePanDownToClose={true}
        handleStyle={{borderRadius: 20, backgroundColor: colors.card}}
        handleIndicatorStyle={{height: 0, width: 0}}
        detached={true}
        containerStyle={{marginHorizontal: 20}}
        backgroundStyle={{borderRadius: 10, marginBottom: 60}}>
        <SelectedStationCard onCardClose={clearStationCard} />
      </BottomSheetWrapper>

      {/* Options BottomSheet */}
      <BottomSheetWrapper
        ref={optionsRef}
        enableDynamicSizing={false}
        index={selectedStation ? 0 : 1}
        snapPoints={[40, 130, '50%', '90%']}
        backgroundStyle={styles.sheetBorderRadius}
        onAnimate={handleAnimate}>
        <MapOptionsList />
        <AvailableStations />
      </BottomSheetWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  mapContainer: {},
  floatingButtonWrapper: {
    position: 'absolute',
    bottom: 2,
    right: 0,
    left: 0,
  },
  floatingButtonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // padding: 20,
  },
  sheetBorderRadius: {
    borderRadius: 0,
  },
  stachIconStyle: {
    borderRadius: 80,
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  locationIconStyle: {
    borderRadius: 80,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
