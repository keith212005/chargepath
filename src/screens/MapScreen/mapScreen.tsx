import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {FloatingButton} from '@components';
import {COLORS} from '@constants';

export const MapScreen = () => {
  const insets = useSafeAreaInsets();
  useEffect(() => {}, []);

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
          iconColor={COLORS.gray}
          backgroundColor={COLORS.white}
          onPress={() => {
            console.log('pressed layres');
          }}
        />

        <FloatingButton
          iconName="my-location"
          iconType="material"
          iconColor={COLORS.gray}
          backgroundColor={COLORS.white}
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
