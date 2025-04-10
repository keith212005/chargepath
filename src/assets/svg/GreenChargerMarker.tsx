import React from 'react';
import {
  Svg,
  Defs,
  RadialGradient,
  Stop,
  Path,
  Circle,
  Rect,
} from 'react-native-svg';

export const GreenChargerMarker = ({
  width = 64,
  height = 96,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 64 96">
      <Defs>
        <RadialGradient id="shadow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <Stop offset="0%" stopColor="#8bc34a" />
          <Stop offset="100%" stopColor="#689f38" />
        </RadialGradient>
      </Defs>
      <Path
        d="M32 0C14.33 0 0 14.33 0 32c0 23 32 64 32 64s32-41 32-64C64 14.33 49.67 0 32 0z"
        fill="url(#shadow)"
      />
      <Circle cx="32" cy="32" r="22" fill="#2e7d32" />
      <Rect x="24" y="20" width="16" height="24" rx="2" ry="2" fill="#ffffff" />
      <Rect x="28" y="25" width="8" height="5" fill="#2e7d32" />
    </Svg>
  );
};
