import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withTiming,
} from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';

export const useBottomSheetAnimation = () => {
  const {height} = useWindowDimensions();
  const sheetIndex = useSharedValue(0);

  const animatedMapStyle = useAnimatedStyle(() => {
    const bottomOffset = interpolate(
      sheetIndex.value,
      [0, 1, 2],
      [40, 130, height * 0.45, height * 0.45],
      Extrapolation.CLAMP,
    );
    return {marginBottom: bottomOffset};
  });

  const handleAnimate = (fromIndex: number, toIndex: number) => {
    if ([0, 1, 2].includes(toIndex)) {
      sheetIndex.value = withTiming(toIndex, {duration: 500});
    }
  };

  return {animatedMapStyle, handleAnimate, sheetIndex};
};
