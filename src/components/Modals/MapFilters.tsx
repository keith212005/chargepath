import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {
  Amenities,
  BottomSheetWrapper,
  BottomSheetWrapperRef,
  KilowattSlider,
  PlugScoreSlider,
  StationCount,
  VehicleAndPlugs,
} from '@components';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Portal} from 'react-native-portalize';
import {useGlobalStyles} from '@utils';
import {useAppTheme} from '@hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {vs} from 'react-native-size-matters';

export interface MapFilterRef {
  expand: () => void;
  close: () => void;
  collapse: () => void;
  forceClose: () => void;
}

interface MapFiltersProps {}

export const MapFilters = forwardRef<MapFilterRef, MapFiltersProps>(
  (_, ref) => {
    const modalRef = useRef<BottomSheetWrapperRef>(null);
    const globalStyles = useGlobalStyles();
    const {colors} = useAppTheme();
    const insets = useSafeAreaInsets();

    // Expose modal control methods via ref
    useImperativeHandle(ref, () => ({
      expand: () => modalRef.current?.expand(),
      close: () => modalRef.current?.close(),
      collapse: () => modalRef.current?.collapse(),
      forceClose: () => modalRef.current?.forceClose(),
    }));

    // Render the header for the bottom sheet
    const renderHeader = () => (
      <View style={[styles.headerContainer, {backgroundColor: colors.black}]}>
        <Text
          style={[
            globalStyles.textStyles('headingXSmall', colors.white),
            styles.headerTitle,
          ]}>
          Map Filters
        </Text>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => modalRef.current?.close()}>
          <Text style={globalStyles.textStyles('labelLarge', colors.white)}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <Portal>
        <BottomSheetWrapper
          ref={modalRef}
          index={-1}
          maxDynamicContentSize={Dimensions.get('window').height - vs(50)}
          handleStyle={{}}
          handleComponent={renderHeader}
          enablePanDownToClose={true}>
          <BottomSheetScrollView
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            style={[styles.contentContainer, {backgroundColor: colors.card}]}>
            <PlugScoreSlider />
            <KilowattSlider />
            <VehicleAndPlugs />
            <StationCount />
            <Amenities />
          </BottomSheetScrollView>
        </BottomSheetWrapper>
      </Portal>
    );
  },
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  resetButton: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: 'red',
  },
});
