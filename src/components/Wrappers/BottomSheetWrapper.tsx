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
};

export const BottomSheetWrapper = forwardRef<
  BottomSheetWrapperRef,
  React.ComponentProps<typeof BottomSheet> & {children?: React.ReactNode}
>(({children, ...props}, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {colors} = useAppTheme();

  // Handle BottomSheet changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log('BottomSheet index changed:', index);
  }, []);

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    expand: () => bottomSheetRef.current?.expand(),
    close: () => bottomSheetRef.current?.close(),
  }));

  return (
    <BottomSheet
      ref={bottomSheetRef}
      handleIndicatorStyle={{
        backgroundColor: colors.text,
        width: 50,
        height: 8,
      }}
      handleStyle={{
        backgroundColor: colors.card,
      }}
      onChange={handleSheetChanges}
      {...props}>
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
