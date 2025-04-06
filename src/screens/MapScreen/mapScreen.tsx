import React, {useEffect} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {FloatingButton, NoInternetView} from '@components';
import {FONTS} from '@constants';
import {checkIsOnline} from '@slice';
import {useAppDispatch, useAppSelector} from '@store';
import {useGlobalStyles} from '@utils';
import {useCustomTheme} from '@hooks';

export const MapScreen = () => {
  const insets = useSafeAreaInsets();
  const isOnline = useAppSelector(state => {
    return state?.network?.isOnline;
  });
  const {colors} = useCustomTheme();
  const globalStyle = useGlobalStyles();

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
        <Text
          style={[
            globalStyle.textStyle('_17', 'white', 'U_BOLD'),
            {
              fontSize: 30,
              // fontFamily: FONTS.U_BOLD,
              position: 'absolute',
              bottom: 100,
              color: colors.card,
            },
          ]}>
          adfkjgfkakfjasdfsafadfadadsf
        </Text>
        <FloatingButton
          iconName="layer-group"
          iconType="font-awesome-5"
          iconColor={colors.text}
          backgroundColor={colors.card}
          onPress={() => {
            console.log('pressed layres');
          }}
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
