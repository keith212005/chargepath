import {useEffect, useState, useCallback} from 'react';
import {AppState, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {Region} from 'react-native-maps';

const initialRegion: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const useLocationPermissionAndRegion = () => {
  const [region, setRegion] = useState<Region | null>(initialRegion);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getPermissionType = () => {
    if (Platform.OS === 'ios') {
      return PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    } else {
      return PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    }
  };

  const fetchRegion = useCallback(() => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude, accuracy} = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: accuracy > 100 ? 0.05 : 0.015, // Adjusting the delta based on accuracy
          longitudeDelta: accuracy > 100 ? 0.05 : 0.0121,
        });
        setAccuracy(accuracy);
        setLoading(false);
      },
      error => {
        if (error.code === 1) {
          setError('Location permission denied.');
        } else if (error.code === 2) {
          setError('Location unavailable.');
        } else if (error.code === 3) {
          setError('Location request timed out.');
        } else {
          setError(error.message);
        }
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
      },
    );
  }, []);

  const checkPermissionAndFetchLocation = useCallback(async () => {
    const permission = getPermissionType();
    const status = await check(permission);
    setPermissionStatus(status);

    switch (status) {
      case RESULTS.GRANTED:
        fetchRegion();
        break;
      case RESULTS.DENIED:
        const newStatus = await request(permission);
        setPermissionStatus(newStatus);
        if (newStatus === RESULTS.GRANTED) {
          fetchRegion();
        }
        break;
      case RESULTS.BLOCKED:
        setError('Permission blocked. Please enable it in settings.');
        break;
    }
  }, [fetchRegion]);

  // Initial run
  useEffect(() => {
    checkPermissionAndFetchLocation();
  }, [checkPermissionAndFetchLocation]);

  // Listen for app coming to foreground (from settings)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkPermissionAndFetchLocation();
      }
    });

    return () => subscription.remove();
  }, [checkPermissionAndFetchLocation]);

  return {
    region,
    permissionStatus,
    loading,
    error,
    refresh: checkPermissionAndFetchLocation,
    openAppSettings: openSettings,
  };
};
