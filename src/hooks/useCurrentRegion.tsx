import Geolocation from '@react-native-community/geolocation';
import React, {useEffect} from 'react';

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export const useCurrentRegion = () => {
  const [region, setRegion] = React.useState<Region | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const getCurrentRegion = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.041,
          });
          setLoading(false);
        },
        error => {
          console.warn('Error getting location', error);
          setError(error.message);
          setLoading(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };
    getCurrentRegion();
  }, []);

  return {region, loading, error};
};
