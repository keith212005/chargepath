import React from 'react';
import Svg, {Circle, Ellipse, Rect, G} from 'react-native-svg';

export const CCS1Svg = ({size = 70, color = '#0033A0'}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 70 70" fill="none">
      {/* Top circular connector outline */}
      <Circle
        cx="32"
        cy="24"
        r="20"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />

      {/* Top large pins */}
      <Circle cx="24" cy="18" r="4" fill={color} />
      <Circle cx="32" cy="34" r="5" fill={color} />
      <Circle cx="40" cy="18" r="4" fill={color} />

      {/* Top small pins */}
      <Circle x="-1" y="-4" cx="23" cy="32" r="2.5" fill={color} />
      <Circle x="2" y="-4" cx="40" cy="32" r="2.5" fill={color} />

      {/* Bottom capsule connector outline */}
      <G>
        <Rect
          x="12"
          y="48"
          width="40"
          height="16"
          rx="8"
          stroke={color}
          strokeWidth="4"
          fill="none"
        />
      </G>

      {/* Bottom pins inside capsule */}
      <Circle cx="24" cy="56" r="4" fill={color} />
      <Circle cx="40" cy="56" r="4" fill={color} />
    </Svg>
  );
};
