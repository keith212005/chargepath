import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

export const NACSIcon = ({size = 64, color = '#0033A0'}) => (
  <Svg width={size} height={size} viewBox="0 0 70 70" fill="none">
    {/* Outer shell shape */}
    <Path
      d="M16 12 C16 4, 48 4, 48 12 C54 22, 54 42, 48 52 C48 60, 16 60, 16 52 C10 42, 10 22, 16 12 Z"
      stroke={color}
      strokeWidth="4"
      fill="none"
    />

    {/* Top open rings */}
    <Circle
      cx="22"
      cy="20"
      r="6"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />
    <Circle
      cx="42"
      cy="20"
      r="6"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />

    {/* Bottom solid pins */}
    <Circle cx="20" cy="42" r="3.2" fill={color} />
    <Circle cx="32" cy="42" r="5.5" fill={color} />
    <Circle cx="44" cy="42" r="3.2" fill={color} />
  </Svg>
);
