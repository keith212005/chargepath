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

export const OrangeChargerMarker = ({
  width = 64,
  height = 96,
  isSelected = false,
}: {
  width?: number;
  height?: number;
  isSelected?: boolean;
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 64 96">
      <Defs>
        <RadialGradient
          id="shadow-orange"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%">
          <Stop offset="0%" stopColor="rgba(255, 183, 77, 1)" />
          <Stop offset="100%" stopColor="rgba(245, 124, 0, 1)" />
        </RadialGradient>
      </Defs>
      <Path
        d="M32 0C14.33 0 0 14.33 0 32c0 23 32 64 32 64s32-41 32-64C64 14.33 49.67 0 32 0z"
        fill="url(#shadow-orange)"
      />
      <Circle
        cx="32"
        cy="32"
        r="26"
        fill={isSelected ? 'black' : 'rgba(124, 57, 3, 0.91)'}
      />
      <Rect
        x="24"
        y="20"
        width="16"
        height="24"
        rx="2"
        ry="2"
        fill="rgba(255, 255, 255, 1)"
      />
      <Rect x="28" y="25" width="8" height="5" fill="rgba(239, 108, 0, 0.8)" />
    </Svg>
  );
};
