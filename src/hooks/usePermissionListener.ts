import {useEffect} from 'react';
import {Alert, AppState, AppStateStatus, Platform} from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {useDispatch} from 'react-redux';
import {setPermissionStatus} from '@slice';

const getPermissionType = () => {
  return Platform.OS === 'ios'
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
};

/**
 * A hook that listens to AppState changes and checks location permission status.
 *
 * It checks the location permission status when the app becomes active and
 * dispatches the status to the store. If the permission is denied, it requests
 * the permission again and handles the result accordingly. If the permission
 * is blocked or unavailable, it shows an alert to open the settings.
 *
 * The hook also handles cases where the permission is limited or not granted
 * or invalid status.
 */
export const usePermissionListener = () => {
  const dispatch = useDispatch();

  const openSettingsAlert = () => {
    Alert.alert(
      'Location Permission Denied',
      'Please enable location services in settings to use this feature.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Settings',
          onPress: () => {
            openSettings();
          },
        },
      ],
    );
  };

  const checkLocationPermission = async () => {
    const permission = getPermissionType();
    const status = await check(permission);
    console.log('Permission Status in usePermissionListener:', status);

    if (status === RESULTS.GRANTED) {
      dispatch(setPermissionStatus('GRANTED'));
    } else if (status === RESULTS.DENIED) {
      console.log('Permission denied, requesting permission...');
      const newStatus = await request(permission); // Request permission again
      console.log('New permission status:', newStatus);

      if (newStatus === RESULTS.GRANTED) {
        dispatch(setPermissionStatus('GRANTED'));
      } else if (newStatus === RESULTS.DENIED) {
        dispatch(setPermissionStatus('DENIED'));
        console.warn('Permission denied again.');
      } else if (newStatus === RESULTS.BLOCKED) {
        dispatch(setPermissionStatus('BLOCKED'));
      }
    } else if (status === RESULTS.BLOCKED) {
      dispatch(setPermissionStatus('BLOCKED'));
      openSettingsAlert();
    } else if (status === RESULTS.UNAVAILABLE) {
      dispatch(setPermissionStatus('UNAVAILABLE'));
      console.warn('Permission unavailable on this device.');
    } else {
      dispatch(setPermissionStatus('LIMITED'));
      console.warn('Permission not granted or invalid status:', status);
    }
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        console.log('App is active, checking location permission...');
        checkLocationPermission();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // Initial check when the app starts
    checkLocationPermission();

    return () => subscription.remove();
  }, [dispatch]);
};
