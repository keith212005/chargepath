import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
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

export const MapScreen = () => {
  const insets = useSafeAreaInsets();
  const isOnline = useAppSelector(state => state?.network?.isOnline);
  const theme = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const {colors} = theme;
  const mapInfoRef = React.useRef<BottomSheetWrapperRef>(null);
  const mapOptionsRef = React.useRef<BottomSheetWrapperRef>(null);
  const [pangestureEnabled, setPangestureEnabled] = React.useState(true);
  const currentTheme = useAppSelector(state => state.theme.currentTheme);

  const MODAL_VISIBLE_HEIGHT =
    verticalScale(tabBarHeight) + verticalScale(HEADER_HEIGHT);

  // useEffect(() => {
  //   console.log('tabBarHeight>>>>>', MODAL_VISIBLE_HEIGHT);

  //   const timer = setTimeout(() => mapOptionsRef?.current?.open(), 150);
  //   return () => clearTimeout(timer);
  // }, []);

  if (!isOnline) {
    return <NoInternetView />;
  }

  return (
    <View style={[styles.container, {marginTop: insets.top}]}>
      <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />

      {/* FloatingButton Container */}
      <View
        style={[styles.floatingButtonContainer, {bottom: verticalScale(86)}]}>
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

      {/* Modal Map Information */}
      <Portal>
        <BottomSheetWrapper
          ref={mapInfoRef}
          snapPoints={[1, '90%']}
          backgroundStyle={{borderRadius: 0}}
          style={{backgroundColor: 'red'}}>
          <MapInfomationHeader ref={mapInfoRef} />
          <MapInformationBody />
        </BottomSheetWrapper>
      </Portal>

      {/* Modal Shown above Tab Bar */}
      <BottomSheetWrapper
        ref={mapOptionsRef}
        snapPoints={[110, '50%', '95%']}
        enableDynamicSizing={true}
        backgroundStyle={{borderRadius: 0}}
        style={{backgroundColor: 'red'}}>
        <View style={{}}>
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});
