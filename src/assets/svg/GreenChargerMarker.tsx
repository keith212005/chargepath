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
  isSelected = false,
}: {
  width?: number;
  height?: number;
  isSelected?: boolean;
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 64 96">
      <Defs>
        <RadialGradient id="shadow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <Stop offset="0%" stopColor="rgb(204, 244, 158)" />
          <Stop offset="100%" stopColor="rgba(104, 159, 56, 1)" />
        </RadialGradient>
      </Defs>
      <Path
        d="M32 0C14.33 0 0 14.33 0 32c0 23 32 64 32 64s32-41 32-64C64 14.33 49.67 0 32 0z"
        fill="url(#shadow)"
      />
      <Circle
        cx="32"
        cy="32"
        r="26"
        fill={isSelected ? 'black' : 'rgb(106, 116, 107)'}
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
      <Rect x="28" y="25" width="8" height="5" fill="rgba(46, 125, 50, 1)" />
    </Svg>
  );
};
