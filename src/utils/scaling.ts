import {PixelRatio, Dimensions} from 'react-native';
export const {height, width} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;

// get responsiveHeight
export const responsiveHeight = (h: number) => {
  return PixelRatio.roundToNearestPixel(height * (h / 100));
};

// get responsiveWidth
export const responsiveWidth = (w: number) => {
  return PixelRatio.roundToNearestPixel(width * (w / 100));
};
