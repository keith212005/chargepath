import React, {useEffect} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import MapView from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FloatingButton,
  NoInternetView,
  BottomSheetWrapper,
  BottomSheetWrapperRef,
} from '@components';
import {useAppSelector} from '@store';
import {MapInfomationHeader} from './mapInformationHeader';
import {MapInformationBody} from './mapInformationBody';
import {useTheme} from '@react-navigation/native';
import {Portal} from 'react-native-portalize';
import {MapOptionsHeader} from './mapOptionsHeader';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {HEADER_HEIGHT} from '@constants';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import {MapOptionsBody} from './mapOptionsBody';
import BottomSheet from '@gorhom/bottom-sheet';
import {responsiveHeight} from '@utils';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withTiming,
  withSpring,
  withDecay,
} from 'react-native-reanimated';

export const MapScreen = () => {
  const insets = useSafeAreaInsets();
  const {height} = useWindowDimensions();
  const isOnline = useAppSelector(state => state?.network?.isOnline);
  const theme = useTheme();
  const {colors} = theme;
  const mapInfoRef = React.useRef<BottomSheetWrapperRef>(null);
  const mapOptionsRef = React.useRef<BottomSheet>(null);
  const sheetIndex = useSharedValue(0);

  const animatedMapStyle = useAnimatedStyle(() => {
    const bottomOffset = interpolate(
      sheetIndex.value,
      [0, 1, 2],
      [130, height * 0.45, height * 0.45],
      Extrapolation.CLAMP,
    );
    return {
      marginBottom: bottomOffset,
    };
  });

  if (!isOnline) {
    return <NoInternetView />;
  }

  return (
    <View style={[styles.container, {}]}>
      <Animated.View style={[{flex: 1, borderWidth: 1}, animatedMapStyle]}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 2,
            right: 0,
            left: 0,
          }}>
          <View style={[styles.floatingButtonContainer]}>
            <FloatingButton
              iconName="layer-group"
              iconType="font-awesome-5"
              iconColor={colors.text}
              backgroundColor={colors.card}
              onPress={() => mapInfoRef?.current?.expand()}
            />

            <FloatingButton
              iconName="my-location"
              iconType="material"
              iconColor={colors.text}
              backgroundColor={colors.card}
              onPress={() => {
                console.log('pressed location');
              }}
            />
          </View>
        </View>
      </Animated.View>

      {/* Modal Map Information */}
      <Portal>
        <BottomSheetWrapper
          ref={mapInfoRef}
          snapPoints={[1, '95%']}
          backgroundStyle={{borderRadius: 0}}
          style={{backgroundColor: 'red'}}>
          <MapInfomationHeader ref={mapInfoRef} />
          <MapInformationBody />
        </BottomSheetWrapper>
      </Portal>

      {/* Modal Shown above Tab Bar */}
      <BottomSheetWrapper
        ref={mapOptionsRef}
        snapPoints={[130, '50%', '90%']}
        enableDynamicSizing={true}
        backgroundStyle={{borderRadius: 0}}
        onChange={index => {
          console.log(index);
          sheetIndex.value = withTiming(index, {
            duration: 600,
          });
        }}>
        <View
          style={{
            backgroundColor: colors.background,
            paddingTop: responsiveHeight(2),
          }}>
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
  floatingButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});
