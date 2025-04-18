import React from 'react';
import Svg, {Circle, Rect, Path} from 'react-native-svg';

export const NEMATT30Icon = ({size = 64, color = '#0033A0'}) => (
  <Svg width={size} height={size} viewBox="0 0 70 70" fill="none">
    {/* Outer circle */}
    <Circle cx="32" cy="32" r="28" stroke={color} strokeWidth="4" fill="none" />

    {/* Left angled pin */}
    <Rect
      x="17"
      y="20"
      width="6"
      height="12"
      fill={color}
      rx="1"
      transform="rotate(40 26 24)"
    />

    {/* Right angled pin */}
    <Rect
      x="40"
      y="20"
      width="6"
      height="12"
      fill={color}
      rx="1"
      transform="rotate(-45 38 24)"
    />

    {/* Bottom semicircle (ground pin) */}
    <Path d="M28 40 a4 4 0 0 1 8 0 v4 h-8 v-4 z" fill={color} />
  </Svg>
);
