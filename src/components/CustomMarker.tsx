import React from 'react';
import {MapMarkerProps, Marker} from 'react-native-maps';
import {GreenChargerMarker, OrangeChargerMarker} from '@assets';
import {hasFastCharger} from '@utils';

interface CustomMarkerProps extends MapMarkerProps {
  station: any;
  isSelected: boolean;
}

export const CustomMarker = (props: CustomMarkerProps) => {
  const {station, isSelected} = props;
  const size = isSelected ? 36 : 26;
  const MarkerComponent = hasFastCharger(station.connections)
    ? OrangeChargerMarker
    : GreenChargerMarker;

  return (
    <Marker
      key={`${station.uuid}-${isSelected}`}
      zIndex={isSelected ? 1 : -1}
      tracksViewChanges={isSelected}
      {...props}>
      <MarkerComponent
        width={size}
        height={size + 20}
        isSelected={isSelected}
      />
    </Marker>
  );
};
