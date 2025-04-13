import React, {memo} from 'react';
import {Marker} from 'react-native-maps';
import {GreenChargerMarker, OrangeChargerMarker} from '@assets';
import {hasFastCharger} from '@utils';

interface CustomMarkerProps {
  station: any;
  isSelected: boolean;
  onMarkerPress: (station: any) => void;
}

/**
 * A custom marker for a station on the map.
 * @param {Object} station - The station data.
 * @param {boolean} isSelected - Whether the station is currently selected.
 * @param {function} onMarkerPress - A callback to call when the marker is pressed.
 * @returns A Marker component with the appropriate image and size.
 */
export const CustomMarker = memo(
  ({station, isSelected, onMarkerPress}: CustomMarkerProps) => {
    const {latitude: lat, longitude: lng} = station?.addressInfo || {};
    if (!lat || !lng) return null;

    const isFastCharger = hasFastCharger(station.connections);

    return (
      <Marker
        key={station.uuid}
        coordinate={{latitude: lat, longitude: lng}}
        tracksViewChanges={isSelected}
        onPress={() => onMarkerPress(station)}>
        <MarkerIcon isFastCharger={isFastCharger} isSelected={isSelected} />
      </Marker>
    );
  },
);

/**
 * A memoized marker icon component.
 * @param {boolean} isFastCharger - Whether the station has a fast charger.
 * @param {boolean} isSelected - Whether the station is currently selected.
 * @returns A marker icon component.
 */
const MarkerIcon = memo(
  ({
    isFastCharger,
    isSelected,
  }: {
    isFastCharger: boolean;
    isSelected: boolean;
  }) => {
    const size = isSelected ? 40 : 26;
    const MarkerComponent = isFastCharger
      ? OrangeChargerMarker
      : GreenChargerMarker;

    return (
      <MarkerComponent
        width={size}
        height={size + 20}
        isSelected={isSelected}
      />
    );
  },
);
