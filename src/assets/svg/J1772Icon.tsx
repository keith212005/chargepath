import React from 'react';
import Svg, {Circle} from 'react-native-svg';

export const J1772Icon = ({size = 64, color = '#0033A0'}) => (
  <Svg width={size} height={size} viewBox="0 0 70 70" fill="none">
    {/* Outer circle */}
    <Circle cx="32" cy="32" r="28" stroke={color} strokeWidth="4" fill="none" />

    {/* Top left and top right pins */}
    <Circle cx="22" cy="24" r="5" fill={color} />
    <Circle cx="42" cy="24" r="5" fill={color} />

    {/* Lower small pins */}
    <Circle cx="19" cy="36" r="2.5" fill={color} />
    <Circle cx="46" cy="36" r="2.5" fill={color} />

    {/* Center bottom pin */}
    <Circle cx="32" cy="42" r="5" fill={color} />
  </Svg>
);
