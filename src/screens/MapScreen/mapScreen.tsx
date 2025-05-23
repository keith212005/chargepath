import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Portal} from 'react-native-portalize';
import Animated from 'react-native-reanimated';

import {
  FloatingButton,
  BottomSheetWrapper,
  BottomSheetWrapperRef,
  CustomMapView,
  SelectedStationCard,
  CustomMapViewProps,
} from '@components';
import {MapInfomationHeader} from './mapInformationHeader';
import {MapInformationBody} from './mapInformationBody';
import {MapOptionsList} from './mapOptionsList';
import {AvailableStations} from './availableStations';

import {useAppTheme, useBottomSheetAnimation} from '@hooks';
import {useAppDispatch, useAppSelector} from '@store';
import {clearSelectedStationAsync} from '@slice';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {verticalScale, vs} from 'react-native-size-matters';
import {Divider} from '@rneui/themed';

export const MapScreen = () => {
  const {colors} = useAppTheme();
  const dispatch = useAppDispatch();

  // Refs for BottomSheets and MapView
  const mapInfoRef = useRef<BottomSheetWrapperRef | null>(null);
  const optionsRef = useRef<BottomSheetWrapperRef | null>(null);
  const selectedStationRef = useRef<BottomSheetWrapperRef>(null);

  // State and Redux Selectors
  const region = useAppSelector(state => state.region);
  const {status} = useAppSelector(state => state.locationPermission);
  const {animatedMapStyle, handleAnimate} = useBottomSheetAnimation();
  const {selectedStation} = useAppSelector(state => state.selectedStation);

  // Flags for Map and Marker Presses
  // const mapPressedRef = useRef(false);
  const markerPressedRef = useRef(false);

  // Fetch initial region when location permission is granted
  useEffect(() => {
    if (status === 'GRANTED') {
      // dispatch(getInitialRegion()).then((region: any) => {});
    }
  }, [status, dispatch]);

  // Clear selected station and close the bottom sheet
  const clearStationCard = useCallback(() => {
    setTimeout(() => {
      dispatch(clearSelectedStationAsync()).then(() => {
        selectedStationRef.current?.close();
      });
    }, 200);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* Custom MapView */}
      <CustomMapView
        onMapPress={() => selectedStationRef.current?.close()}
        onMarkerPress={() => selectedStationRef.current?.expand()}
      />

      {/* This View is used for map animation do not remove */}
      <Animated.View style={animatedMapStyle}>
        {/* {!selectedStation && <FloatingButtons />} */}
      </Animated.View>

      <Animated.View style={[styles.stachIconStyle, animatedMapStyle]}>
        {!selectedStation && (
          <FloatingButton
            iconName="layer-group"
            iconType="font-awesome-5"
            iconColor={colors.text}
            iconSize={24}
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
            iconSize={24}
            backgroundColor={colors.card}
            // onPress={() => {
            //   if (region) {
            //     mapRef.current?.animateToRegion(region, 1000);
            //   }
            // }}
            accessible
            accessibilityLabel="Open map layers"
          />
        )}
      </Animated.View>

      {/* Map Information Modal */}
      <Portal>
        <BottomSheetWrapper ref={mapInfoRef} snapPoints={[1, '95%']}>
          <BottomSheetView style={{flex: 1}}>
            <MapInfomationHeader ref={mapInfoRef} />
            <MapInformationBody />
          </BottomSheetView>
        </BottomSheetWrapper>
      </Portal>

      {/* Selected Station Card Modal*/}
      <BottomSheetWrapper
        ref={selectedStationRef}
        index={-1} // Start in a closed state
        snapPoints={['27%']}
        enablePanDownToClose={true}
        handleStyle={{borderRadius: 20, backgroundColor: colors.card}}
        handleIndicatorStyle={{height: 0, width: 0}}
        detached={true}
        containerStyle={{marginHorizontal: 20}}
        backgroundStyle={{borderRadius: 10, marginBottom: 60}}>
        <BottomSheetView style={{flex: 1}}>
          <SelectedStationCard onCardClose={clearStationCard} />
        </BottomSheetView>
      </BottomSheetWrapper>

      {/* Options Search Filter, etc Modal */}
      <BottomSheetWrapper
        ref={optionsRef}
        enableDynamicSizing={false}
        index={selectedStation ? 0 : 1}
        snapPoints={[40, 130, '50%', '90%']}
        onAnimate={handleAnimate}>
        <View style={{flex: 1, paddingTop: verticalScale(10)}}>
          <MapOptionsList />
          <Divider style={{marginVertical: vs(10)}} />
          <AvailableStations />
        </View>
      </BottomSheetWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
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
