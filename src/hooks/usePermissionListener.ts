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

// This hook is used when the app starts in the App Component
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
        // Alert.alert(
        //   'Location Permission Required',
        //   'This app requires location permission to function properly. Please grant the permission.',
        //   [
        //     {
        //       text: 'Cancel',
        //       onPress: () => console.log('Permission request canceled'),
        //       style: 'cancel',
        //     },
        //     {
        //       text: 'Try Again',
        //       onPress: () => checkLocationPermission(),
        //     },
        //   ],
        // );
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

    return () => {
      subscription.remove();
    };
  }, [dispatch]);
};
