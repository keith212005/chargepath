import React, {useEffect, useRef} from 'react';
import {Alert, Platform, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {Portal} from 'react-native-portalize';
import Animated from 'react-native-reanimated';

import {
  FloatingButton,
  BottomSheetWrapper,
  BottomSheetWrapperRef,
  CustomMapView,
} from '@components';
import {MapInfomationHeader} from './mapInformationHeader';
import {MapInformationBody} from './mapInformationBody';
import {MapOptionsList} from './mapOptionsList';
import {AvailableStations} from './availableStations';

import {useAppTheme, useBottomSheetAnimation} from '@hooks';
import {useAppDispatch, useAppSelector} from '@store';
import {getInitialRegion} from '@slice';
import {Text} from 'react-native';

export const MapScreen = () => {
  const {colors} = useAppTheme();
  const dispatch = useAppDispatch();
  const infoSheetRef = useRef<BottomSheetWrapperRef>(null);
  const optionsSheetRef = useRef<BottomSheetWrapperRef>(null);
  const mapRef = useRef<MapView>(null);
  const region = useAppSelector(state => state.region);
  const {status} = useAppSelector(state => state.locationPermission);
  const {animatedMapStyle, handleAnimate} = useBottomSheetAnimation();

  // Handle location permission and fetch initial region
  useEffect(() => {
    if (status === 'GRANTED') {
      dispatch(getInitialRegion())
        .unwrap()
        .then(region => {
          // mapRef.current?.animateToRegion(region, 1000);
        })
        .catch(error => {
          console.error('Failed to fetch initial region:', error);
        });
    } else {
      console.warn('Permission not granted:', status);
    }
  }, [status, dispatch]);

  // Render loading state if region is not available
  if (!region) {
    return <Text>Loading...</Text>;
  }

  // Floating buttons component
  const FloatingButtons = () => (
    <View style={styles.floatingButtonWrapper}>
      <View style={styles.floatingButtonContainer}>
        <FloatingButton
          iconName="layer-group"
          iconType="font-awesome-5"
          iconColor={colors.text}
          backgroundColor={colors.card}
          onPress={() => infoSheetRef.current?.expand()}
          accessible
          accessibilityLabel="Open map layers"
        />
        <FloatingButton
          iconName="my-location"
          iconType="material"
          iconColor={colors.text}
          backgroundColor={colors.card}
          // Add functionality for "my-location" button if needed
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.mapContainer, animatedMapStyle]}>
        <CustomMapView ref={mapRef} />
        <FloatingButtons />
      </Animated.View>

      {/* Map Information BottomSheet */}
      <Portal>
        <BottomSheetWrapper
          ref={infoSheetRef}
          snapPoints={[1, '95%']}
          backgroundStyle={styles.sheetBorderRadius}>
          <MapInfomationHeader ref={infoSheetRef} />
          <MapInformationBody />
        </BottomSheetWrapper>
      </Portal>

      {/* Options BottomSheet */}
      <BottomSheetWrapper
        ref={optionsSheetRef}
        enableDynamicSizing={false}
        snapPoints={[130, '50%', '90%']}
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
  mapContainer: {
    flex: 1,
  },
  floatingButtonWrapper: {
    position: 'absolute',
    bottom: 2,
    right: 0,
    left: 0,
  },
  floatingButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  sheetBorderRadius: {
    borderRadius: 0,
  },
});
