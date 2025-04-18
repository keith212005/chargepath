import React from 'react';
import Svg, {Circle, G, Line} from 'react-native-svg';

export const CHAdeMOIcon = ({size = 64, color = '#0033A0'}) => (
  <Svg width={size} height={size} viewBox="0 0 70 70" fill="none">
    {/* Outer ring */}
    <Circle cx="32" cy="32" r="28" stroke={color} strokeWidth="4" fill="none" />

    {/* Left and right solid pins */}
    <Circle cx="18" cy="32" r="5" fill={color} />
    <Circle cx="47" cy="32" r="5" fill={color} />

    {/* Top and bottom x-mark pins */}
    <G stroke={color} strokeWidth="1.5">
      <Circle cx="32" cy="18" r="4.5" fill="none" />
      <Line x1="29.5" y1="15.5" x2="34.5" y2="20.5" />
      <Line x1="34.5" y1="15.5" x2="29.5" y2="20.5" />

      <Circle cx="32" cy="46" r="4.5" fill="none" />
      <Line x1="29.5" y1="43.5" x2="34.5" y2="48.5" />
      <Line x1="34.5" y1="43.5" x2="29.5" y2="48.5" />
    </G>
  </Svg>
);
