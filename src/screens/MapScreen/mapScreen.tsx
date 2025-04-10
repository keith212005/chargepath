import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, useWindowDimensions, View} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import {Portal} from 'react-native-portalize';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withTiming,
} from 'react-native-reanimated';

import {
  FloatingButton,
  BottomSheetWrapper,
  BottomSheetWrapperRef,
} from '@components';
import {MapInfomationHeader} from './mapInformationHeader';
import {MapInformationBody} from './mapInformationBody';
import {MapOptionsList} from './mapOptionsList';

import {responsiveHeight} from '@utils';
import {useAppTheme} from '@hooks';
import {useLocationPermissionAndRegion} from '@hooks';
import {RESULTS} from 'react-native-permissions';
import {useAppSelector} from '@store';
import {Text} from 'react-native';
import axios from 'axios';
import {AvailableStations} from './availableStations';

/**
 * The main map screen component.
 *
 * This component renders a map view, a floating button container with two buttons,
 * and two bottom sheets for displaying map information and map options.
 *
 * @returns The map screen component.
 */
export const MapScreen = () => {
  const {height} = useWindowDimensions();
  const {colors} = useAppTheme();
  const infoSheetRef = useRef<BottomSheetWrapperRef>(null);
  const optionsSheetRef = useRef<BottomSheet>(null);
  const sheetIndex = useSharedValue(0);
  const mapRef = useRef<MapView>(null);
  const {mapType, showTraffic, showScale} = useAppSelector(state => {
    return state.mapType;
  });
  const {region, permissionStatus, loading, refresh, openAppSettings} =
    useLocationPermissionAndRegion();

  const animatedMapStyle = useAnimatedStyle(() => {
    const bottomOffset = interpolate(
      sheetIndex.value,
      [0, 1, 2],
      [130, height * 0.45, height * 0.45],
      Extrapolation.CLAMP,
    );
    return {marginBottom: bottomOffset};
  });

  const handleAnimate = useCallback((fromIndex: number, toIndex: number) => {
    if ([0, 1, 2].includes(toIndex)) {
      sheetIndex.value = withTiming(toIndex, {duration: 500});
    }
  }, []);

  const handlePermissionStatus = () => {
    switch (permissionStatus) {
      case RESULTS.BLOCKED:
        Alert.alert(
          'Location Permission',
          'Please enable location permission in settings',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Settings',
              onPress: () => openAppSettings(),
            },
          ],
        );
        break;

      case RESULTS.GRANTED:
        if (mapRef.current && region) {
          mapRef.current.animateToRegion(
            {
              ...region,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            },
            1000,
          );
        } else {
          Alert.alert('Error', 'Unable to center the map. Try again.');
        }
        break;

      case RESULTS.DENIED:
        Alert.alert(
          'Location Permission',
          'Location permission is denied. Please grant permission to use this feature.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Request Permission',
              onPress: () => refresh(),
            },
          ],
        );
        break;

      default:
        Alert.alert('Error', 'Unable to determine permission status.');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.mapContainer, animatedMapStyle]}>
        <MapView
          showsScale={showScale}
          mapType={mapType.type}
          showsTraffic={showTraffic}
          ref={mapRef} // Step 2: Update MapView component
          showsUserLocation={true}
          loadingEnabled={loading}
          style={StyleSheet.absoluteFillObject}
          region={region as Region | undefined}
        />
        <View style={styles.floatingButtonWrapper}>
          <View style={styles.floatingButtonContainer}>
            <FloatingButton
              iconName="layer-group"
              iconType="font-awesome-5"
              iconColor={colors.text}
              backgroundColor={colors.card}
              onPress={() => infoSheetRef.current?.expand()}
              accessible={true}
              accessibilityLabel="Open map layers"
            />
            <FloatingButton
              iconName="my-location"
              iconType="material"
              iconColor={colors.text}
              backgroundColor={colors.card}
              onPress={handlePermissionStatus}
            />
          </View>
        </View>
      </Animated.View>

      <Portal>
        <BottomSheetWrapper
          ref={infoSheetRef}
          snapPoints={[1, '95%']}
          backgroundStyle={styles.sheetBorderRadius}>
          <MapInfomationHeader ref={infoSheetRef} />
          <MapInformationBody />
        </BottomSheetWrapper>
      </Portal>

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
