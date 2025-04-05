import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TurboModuleRegistry} from 'react-native';

export const MapScreen = () => {
  const insets = useSafeAreaInsets();
  useEffect(() => {
    console.log(
      'New Arch enabled:',
      !!TurboModuleRegistry.get('NativeDevSettings'), // Will return false if disabled
    );
  }, []);

  return (
    <View style={[styles.container, {marginTop: insets.top}]}>
      <MapView
        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
      <View>
        <Text>Map Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
