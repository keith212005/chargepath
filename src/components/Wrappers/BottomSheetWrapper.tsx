import React, {
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';
import {useAppTheme} from '@hooks';

export type BottomSheetWrapperRef = {
  expand: () => void;
  close: () => void;
  collapse: () => void;
  forceClose: () => void;
  snapToIndex?: (index: number) => void;
  snapToPosition?: (position: number) => void;
};

export const BottomSheetWrapper = forwardRef<
  BottomSheetWrapperRef,
  React.ComponentProps<typeof BottomSheet> & {children?: React.ReactNode}
>(({children, ...props}, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {colors} = useAppTheme();

  // Handle BottomSheet changes
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('BottomSheet index changed useCallback:', index);
  }, []);

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    expand: () => bottomSheetRef.current?.expand(),
    close: () => bottomSheetRef.current?.close(),
    snapToIndex: index => bottomSheetRef.current?.snapToIndex(index),
    snapToPosition: index => bottomSheetRef.current?.snapToPosition(index),
    collapse: () => bottomSheetRef.current?.collapse(),
    forceClose: () => bottomSheetRef.current?.forceClose(),
  }));

  return (
    <BottomSheet
      ref={bottomSheetRef}
      handleIndicatorStyle={{
        backgroundColor: colors.text,
        width: 50,
        height: 8,
      }}
      detached={true}
      handleStyle={{
        backgroundColor: colors.card,
      }}
      onChange={handleSheetChanges}
      {...props}>
      <BottomSheetView style={[styles.contentContainer]}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    // backgroundColor: 'pink',
  },
});
