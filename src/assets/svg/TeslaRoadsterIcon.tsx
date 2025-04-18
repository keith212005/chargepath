import React from 'react';
import Svg, {Circle} from 'react-native-svg';

export const TeslaRoadsterIcon = ({size = 64, color = '#0033A0'}) => (
  <Svg width={size} height={size} viewBox="0 0 70 70" fill="none">
    {/* Outer ring */}
    <Circle cx="32" cy="32" r="28" stroke={color} strokeWidth="4" fill="none" />

    {/* Pins - top, left, right, bottom */}
    <Circle cx="32" cy="20" r="3.5" fill={color} />
    <Circle cx="22" cy="32" r="5" fill={color} />
    <Circle cx="42" cy="32" r="5" fill={color} />
    <Circle cx="32" cy="44" r="5" fill={color} />
  </Svg>
);
