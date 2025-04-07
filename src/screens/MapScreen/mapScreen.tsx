import React, {useCallback, useRef} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import MapView from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import {Portal} from 'react-native-portalize';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withTiming,
} from 'react-native-reanimated';

import {
  FloatingButton,
  NoInternetView,
  BottomSheetWrapper,
  BottomSheetWrapperRef,
} from '@components';
import {useAppSelector} from '@store';
import {MapInfomationHeader} from './mapInformationHeader';
import {MapInformationBody} from './mapInformationBody';
import {MapOptionsHeader} from './mapOptionsHeader';
import {MapOptionsBody} from './mapOptionsBody';
import {responsiveHeight} from '@utils';
import {useAppTheme} from '@hooks';

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
  const isOnline = useAppSelector(state => state?.network?.isOnline);
  const {colors} = useAppTheme();
  const infoSheetRef = useRef<BottomSheetWrapperRef>(null);
  const optionsSheetRef = useRef<BottomSheet>(null);
  const sheetIndex = useSharedValue(0);

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

  if (!isOnline) {
    return <NoInternetView />;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.mapContainer, animatedMapStyle]}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
        <View style={styles.floatingButtonWrapper}>
          <View style={styles.floatingButtonContainer}>
            <FloatingButton
              iconName="layer-group"
              iconType="font-awesome-5"
              iconColor={colors.text}
              backgroundColor={colors.card}
              onPress={() => infoSheetRef.current?.expand()}
            />
            <FloatingButton
              iconName="my-location"
              iconType="material"
              iconColor={colors.text}
              backgroundColor={colors.card}
              onPress={() => console.log('pressed location')}
            />
          </View>
        </View>
      </Animated.View>

      <Portal>
        <BottomSheetWrapper
          ref={infoSheetRef}
          snapPoints={[1, '95%']}
          backgroundStyle={styles.sheetBorderRadius}
          style={styles.infoSheet}>
          <MapInfomationHeader ref={infoSheetRef} />
          <MapInformationBody />
        </BottomSheetWrapper>
      </Portal>

      <BottomSheetWrapper
        ref={optionsSheetRef}
        snapPoints={[130, '50%', '90%']}
        enableDynamicSizing
        backgroundStyle={styles.sheetBorderRadius}
        onAnimate={handleAnimate}>
        <View
          style={[styles.optionsBody, {backgroundColor: colors.background}]}>
          <MapOptionsHeader />
          <MapOptionsBody />
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
  infoSheet: {
    backgroundColor: 'red',
  },
  optionsBody: {
    paddingTop: responsiveHeight(2),
  },
});
