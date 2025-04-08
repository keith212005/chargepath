import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const checkLocationPermission = async (): Promise<boolean> => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const result = await check(permission);

  if (result === RESULTS.GRANTED) return true;
  if (result === RESULTS.DENIED) {
    const req = await request(permission);
    return req === RESULTS.GRANTED;
  }

  return false;
};
