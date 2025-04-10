import {useCallback} from 'react';
import {Alert} from 'react-native';
import {RESULTS} from 'react-native-permissions';
import MapView, {Region} from 'react-native-maps';

type UseHandlePermissionStatusParams = {
  permissionStatus: string;
  region: Region | null;
  mapRef: React.RefObject<MapView>;
  refresh: () => void;
  openAppSettings: () => void;
};

export const useHandlePermissionStatus = ({
  permissionStatus,
  region,
  mapRef,
  refresh,
  openAppSettings,
}: UseHandlePermissionStatusParams) => {
  const handlePermissionStatus = useCallback(() => {
    switch (permissionStatus) {
      case RESULTS.BLOCKED:
        Alert.alert(
          'Location Permission',
          'Please enable location permission in settings',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Settings', onPress: openAppSettings},
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
            {text: 'Cancel', style: 'cancel'},
            {text: 'Request Permission', onPress: refresh},
          ],
        );
        break;

      default:
        Alert.alert('Error', 'Unable to determine permission status.');
        break;
    }
  }, [permissionStatus, region, mapRef, refresh, openAppSettings]);

  return {handlePermissionStatus};
};
