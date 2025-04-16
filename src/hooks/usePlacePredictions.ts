import {useEffect, useState, useMemo} from 'react';
import GooglePlacesSDK, {
  PlacePrediction,
  PredictionFiltersParam,
} from 'react-native-google-places-sdk';
import {useAppSelector} from '@store';

// Initialize the Google Places SDK
GooglePlacesSDK.initialize(`${process.env.GOOGLE_MAPS_API_KEY}`);

export const usePlacePredictions = (input: string) => {
  console.log('usePlacePredictions called with input:', input);

  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const region = useAppSelector(state => state.region);
  const stationList = useAppSelector(state => state.stationList.data);
  const {latitude: lat, longitude: lng} = region;

  // Memoize the filters object to prevent unnecessary re-renders
  const filters: PredictionFiltersParam = useMemo(() => {
    console.log('Filters recalculated');
    return {
      types: ['geocode'],
      locationBias: {
        northEast: {latitude: lat, longitude: lng},
        southWest: {latitude: lat, longitude: lng},
      },
      origin: {latitude: lat, longitude: lng},
    };
  }, [lat, lng]);

  useEffect(() => {
    console.log('useEffect triggered with input:', input);

    if (input && input.length < 2) {
      setPredictions([]);
      setLoadingPrediction(false);
      return;
    }

    setLoadingPrediction(true);

    GooglePlacesSDK.fetchPredictions(input, filters)
      .then(results => {
        console.log('Predictions fetched:', results);

        let combineResults = results;
        if (input) {
          combineResults = [...results, ...stationList];
        }

        setPredictions(combineResults);
      })
      .catch(error => {
        console.error('Error fetching place predictions:', error);
      })
      .finally(() => {
        setLoadingPrediction(false);
      });
  }, [input]);

  console.log('Predictions:>>>>>>>>>>', predictions);

  return {predictions, loadingPrediction};
};
