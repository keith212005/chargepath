import React from 'react';
import {StyleSheet} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {FONTS, FONT_SIZE, LightTheme, MyDarkTheme} from '@constants';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export type Style = {
  textStyle: (
    fontSize: keyof typeof FONT_SIZE,
    color:
      | keyof typeof MyDarkTheme.colors
      | keyof typeof LightTheme.colors
      | string,
    fontFamily: keyof typeof FONTS,
  ) => object;
  layoutDirection: (
    direction: string,
    justifyContent: string,
    alignItems: string,
  ) => object;
  squareLayout: (size: number) => object;
  absoluteLayout: (
    position?: string,
    top?: number,
    left?: number,
    bottom?: number,
    right?: number,
  ) => object;
};

type CreateStyles = <T>(styles: T) => T;

export const createStyles: CreateStyles = StyleSheet.create;

const getGlobalStyles = (props: {colors: any}) =>
  createStyles<Style>({
    textStyle: (fontSize, color, fontFamily) => {
      return {
        fontSize: moderateScale(FONT_SIZE[fontSize]),
        color: props.colors[color],
        fontFamily: FONTS[fontFamily],
        letterSpacing: 0.8,
      };
    },
    layoutDirection: (direction, justifyContent, alignItems) => {
      return {
        flexDirection: direction,
        alignItems: alignItems,
        justifyContent: justifyContent,
      };
    },
    squareLayout: size => {
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
