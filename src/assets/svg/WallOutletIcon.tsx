import React from 'react';
import Svg, {Circle, Rect, Path} from 'react-native-svg';

export const WallOutletIcon = ({size = 64, color = '#0033A0'}) => (
  <Svg width={size} height={size} viewBox="0 0 70 70" fill="none">
    {/* Outer ring */}
    <Circle cx="32" cy="32" r="28" stroke={color} strokeWidth="4" fill="none" />

    {/* Left vertical slot */}
    <Rect x="20" y="18" width="6" height="16" fill={color} rx="1" />

    {/* Right vertical slot */}
    <Rect x="40" y="21" width="6" height="10" fill={color} rx="1" />

    {/* Bottom semicircle ground pin */}
    <Path d="M28 46 a4 4 0 0 1 8 0 v4 h-8 v-4 z" fill={color} />
  </Svg>
);
