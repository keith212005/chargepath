import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import {Portal} from 'react-native-portalize';
import Animated from 'react-native-reanimated';

import {
  FloatingButton,
  BottomSheetWrapper,
  BottomSheetWrapperRef,
} from '@components';
import {MapInfomationHeader} from './mapInformationHeader';
import {MapInformationBody} from './mapInformationBody';
import {MapOptionsList} from './mapOptionsList';
import {AvailableStations} from './availableStations';

import {
  useAppTheme,
  useBottomSheetAnimation,
  useHandlePermissionStatus,
} from '@hooks';
import {useLocationPermissionAndRegion} from '@hooks';
import {useAppSelector} from '@store';
import {Text} from 'react-native';

/**
 * The main map screen component.
 *
 * This component renders a map view, a floating button container with two buttons,
 * and two bottom sheets for displaying map information and map options.
 *
 * @returns The map screen component.
 */
export const MapScreen = () => {
  const {colors} = useAppTheme();
  const infoSheetRef = useRef<BottomSheetWrapperRef>(null);
  const optionsSheetRef = useRef<BottomSheetWrapperRef>(null);

  const mapRef = useRef<MapView>(null);
  const {mapType, showTraffic, showScale} = useAppSelector(
    state => state.mapType,
  );
  const {region, permissionStatus, loading, refresh, openAppSettings} =
    useLocationPermissionAndRegion();
  const {animatedMapStyle, handleAnimate} = useBottomSheetAnimation();
  const {handlePermissionStatus} = useHandlePermissionStatus({
    permissionStatus,
    region,
    mapRef: mapRef as React.RefObject<MapView>,
    refresh,
    openAppSettings,
  });

  if (!region) {
    <Text>Loading....</Text>;
  }

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
