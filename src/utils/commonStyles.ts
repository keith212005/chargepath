import React from 'react';
import {FONTS, FONT_SIZE} from '@constants';
import {ms} from 'react-native-size-matters';
import {useAppTheme} from '@hooks';

const getGlobalStyles = (props: {colors: any}) => ({
  textStyle: (
    fontSize: keyof typeof FONT_SIZE,
    color: keyof typeof props.colors,
    fontFamily: keyof typeof FONTS,
  ) => {
    const resolvedColor = props.colors[color] ?? color;
    return {
      fontSize: ms(FONT_SIZE[fontSize]),
      color: resolvedColor,
      fontFamily: FONTS[fontFamily],
      letterSpacing: 0.7,
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
  textStyles: (
    type:
      | 'displayLarge'
      | 'displayMedium'
      | 'displaySmall'
      | 'displayXSmall'
      | 'headingXXLarge'
      | 'headingXLarge'
      | 'headingLarge'
      | 'headingMedium'
      | 'headingSmall'
      | 'headingXSmall'
      | 'labelLarge'
      | 'labelMedium'
      | 'labelSmall'
      | 'labelXSmall'
      | 'paragraphLarge'
      | 'paragraphMedium'
      | 'paragraphSmall'
      | 'paragraphXSmall',
    color: keyof typeof props.colors,
  ) => {
    const resolvedColor = props.colors[color] ?? color;
    const styles = {
      displayLarge: {
        fontSize: ms(96),
        lineHeight: ms(112),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
        color: resolvedColor,
      },
      displayMedium: {
        fontSize: ms(52),
        lineHeight: ms(64),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      displaySmall: {
        fontSize: ms(44),
        lineHeight: ms(52),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      displayXSmall: {
        fontSize: ms(36),
        lineHeight: ms(44),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      headingXXLarge: {
        fontSize: ms(40),
        lineHeight: ms(52),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      headingXLarge: {
        fontSize: ms(36),
        lineHeight: ms(44),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      headingLarge: {
        fontSize: ms(32),
        lineHeight: ms(40),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      headingMedium: {
        fontSize: ms(28),
        lineHeight: ms(36),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      headingSmall: {
        fontSize: ms(24),
        lineHeight: ms(32),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      headingXSmall: {
        fontSize: ms(20),
        lineHeight: ms(28),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0.3,
      },
      labelLarge: {
        fontSize: ms(18),
        lineHeight: ms(24),
        fontFamily: FONTS.U_MED,
        letterSpacing: 0,
      },
      labelMedium: {
        fontSize: ms(16),
        lineHeight: ms(20),
        fontFamily: FONTS.U_MED,
        letterSpacing: 0,
      },
      labelSmall: {
        fontSize: ms(12),
        lineHeight: ms(16),
        fontFamily: FONTS.U_MED,
        letterSpacing: 0.3,
      },
      labelXSmall: {
        fontSize: ms(10),
        lineHeight: ms(16),
        fontFamily: FONTS.U_MED,
        letterSpacing: 0.5,
      },
      paragraphLarge: {
        fontSize: ms(18),
        lineHeight: ms(28),
        fontFamily: FONTS.U_REG,
        letterSpacing: 0,
      },
      paragraphMedium: {
        fontSize: ms(16),
        lineHeight: ms(24),
        fontFamily: FONTS.U_REG,
        letterSpacing: 0,
      },
      paragraphSmall: {
        fontSize: ms(14),
        lineHeight: ms(20),
        fontFamily: FONTS.U_REG,
        letterSpacing: 0,
      },
      paragraphXSmall: {
        fontSize: ms(12),
        lineHeight: ms(20),
        fontFamily: FONTS.U_REG,
        letterSpacing: 0,
      },
    };
    return {...styles[type], color: resolvedColor};
  },
});

// This is an example of custom Hook
export function useGlobalStyles() {
  const {colors} = useAppTheme();

  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  return styles;
}
