import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FloatingButton,
  ModalWrapperRef,
  ModalWrapper,
  NoInternetView,
} from '@components';
import {useAppSelector} from '@store';

import {useGlobalStyles} from '@utils';
import {MapInfomationHeader} from './mapInformationHeader';
import {MapInformationBody} from './mapInformationBody';
import {useTheme} from '@react-navigation/native';

export const MapScreen = () => {
  const insets = useSafeAreaInsets();
  const isOnline = useAppSelector(state => state?.network?.isOnline);
  const theme = useTheme();
  const {colors} = theme;
  const mapInfoRef = React.useRef<ModalWrapperRef>(null);
  const globalStyle = useGlobalStyles();
  const currentTheme = useAppSelector(state => state.theme.currentTheme);
  console.log('currentTheme>>>>>', currentTheme);

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
        }}></MapView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <FloatingButton
          iconName="layer-group"
          iconType="font-awesome-5"
          iconColor={colors.text}
          backgroundColor={colors.card}
          onPress={() => mapInfoRef?.current?.open()}
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
      <ModalWrapper
        ref={mapInfoRef}
        scrollViewProps={{bounces: false}}
        handlePosition="inside"
        handleStyle={{backgroundColor: colors.text}}
        modalHeight={Dimensions.get('window').height - 70}
        HeaderComponent={<MapInfomationHeader ref={mapInfoRef} />}>
        <MapInformationBody />
      </ModalWrapper>
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
});
