import React from 'react';
import Svg, {Circle, Rect, Path} from 'react-native-svg';

export const NEMA1450Icon = ({size = 64, color = '#0033A0'}) => (
  <Svg width={size} height={size} viewBox="0 0 70 70" fill="none">
    {/* Outer ring */}
    <Circle cx="32" cy="32" r="28" stroke={color} strokeWidth="4" fill="none" />

    {/* Vertical pin */}
    <Rect x="30" y="14" width="4" height="12" fill={color} rx="1" />

    {/* Left angled pin */}
    <Rect x="18" y="26" width="4" height="12" fill={color} rx="1" />

    {/* Right angled pin */}
    <Rect x="42" y="26" width="4" height="12" fill={color} rx="1" />

    {/* Bottom semicircle (ground) */}
    <Path d="M28 44 a4 4 0 0 1 8 0 v4 h-8 v-4 z" fill={color} />
  </Svg>
);
