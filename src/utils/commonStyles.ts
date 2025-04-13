import React from 'react';
import {FONTS, FONT_SIZE} from '@constants';
import {moderateScale} from 'react-native-size-matters';
import {useAppTheme} from '@hooks';

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
        fontSize: moderateScale(96),
        lineHeight: moderateScale(112),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
        color: resolvedColor,
      },
      displayMedium: {
        fontSize: moderateScale(52),
        lineHeight: moderateScale(64),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      displaySmall: {
        fontSize: moderateScale(44),
        lineHeight: moderateScale(52),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      displayXSmall: {
        fontSize: moderateScale(36),
        lineHeight: moderateScale(44),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      headingXXLarge: {
        fontSize: moderateScale(40),
        lineHeight: moderateScale(52),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      headingXLarge: {
        fontSize: moderateScale(36),
        lineHeight: moderateScale(44),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      headingLarge: {
        fontSize: moderateScale(32),
        lineHeight: moderateScale(40),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      headingMedium: {
        fontSize: moderateScale(28),
        lineHeight: moderateScale(36),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      headingSmall: {
        fontSize: moderateScale(24),
        lineHeight: moderateScale(32),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0,
      },
      headingXSmall: {
        fontSize: moderateScale(20),
        lineHeight: moderateScale(28),
        fontFamily: FONTS.U_BOLD,
        letterSpacing: 0.3,
      },
      labelLarge: {
        fontSize: moderateScale(18),
        lineHeight: moderateScale(24),
        fontFamily: FONTS.U_MED,
        letterSpacing: 0,
      },
      labelMedium: {
        fontSize: moderateScale(16),
        lineHeight: moderateScale(20),
        fontFamily: FONTS.U_MED,
        letterSpacing: 0,
      },
      labelSmall: {
        fontSize: moderateScale(12),
        lineHeight: moderateScale(16),
        fontFamily: FONTS.U_MED,
        letterSpacing: 0.3,
      },
      labelXSmall: {
        fontSize: moderateScale(10),
        lineHeight: moderateScale(16),
        fontFamily: FONTS.U_MED,
        letterSpacing: 0.5,
      },
      paragraphLarge: {
        fontSize: moderateScale(18),
        lineHeight: moderateScale(28),
        fontFamily: FONTS.U_REG,
        letterSpacing: 0,
      },
      paragraphMedium: {
        fontSize: moderateScale(16),
        lineHeight: moderateScale(24),
        fontFamily: FONTS.U_REG,
        letterSpacing: 0,
      },
      paragraphSmall: {
        fontSize: moderateScale(14),
        lineHeight: moderateScale(20),
        fontFamily: FONTS.U_REG,
        letterSpacing: 0,
      },
      paragraphXSmall: {
        fontSize: moderateScale(12),
        lineHeight: moderateScale(20),
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
