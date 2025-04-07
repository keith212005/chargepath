import React from 'react';
import {StyleSheet} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {FONTS, FONT_SIZE} from '@constants';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const getGlobalStyles = (props: {colors: any}) => ({
  textStyle: (
    fontSize: keyof typeof FONT_SIZE,
    color: keyof typeof props.colors,
    fontFamily: keyof typeof FONTS,
  ) => {
    const resolvedColor = props.colors[color] ?? color;
    return {
      fontSize: moderateScale(FONT_SIZE[fontSize]),
      color: resolvedColor,
      fontFamily: FONTS[fontFamily],
      letterSpacing: 1,
    };
  },
  layoutDirection: (
    direction: 'row' | 'column',
    justifyContent:
      | 'flex-start'
      | 'center'
      | 'flex-end'
      | 'space-between'
      | 'space-around'
      | 'space-evenly',
    alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline',
  ) => {
    return {
      flexDirection: direction,
      alignItems: alignItems,
      justifyContent: justifyContent,
    };
  },
  squareLayout: (size: number) => {
    return {
      width: size,
      aspectRatio: 1,
    };
  },
  absoluteLayout() {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    };
  },
});

// This is an example of custom Hook
export function useGlobalStyles() {
  const {colors} = useTheme();

  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  return styles;
}
