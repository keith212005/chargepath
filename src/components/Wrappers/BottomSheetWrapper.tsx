import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Text, StyleSheet} from 'react-native';

export type BottomSheetWrapperRef = {
  // Add methods here if needed
  expand: () => void;
  close: () => void;
};

export const BottomSheetWrapper = forwardRef<
  BottomSheetWrapperRef,
  React.ComponentProps<typeof BottomSheet> & {children?: React.ReactNode}
>((props, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useImperativeHandle(ref, () => ({
    expand: () => bottomSheetRef.current?.expand(),
    close: () => bottomSheetRef.current?.close(),
  })); // Expose any custom methods here

  return (
    <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges} {...props}>
      <BottomSheetView style={styles.contentContainer}>
        {props.children}
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
