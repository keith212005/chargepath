import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Slider} from '@rneui/themed';
import {useAppTheme} from '@hooks';
import {useGlobalStyles} from '@utils';
import {vs, s} from 'react-native-size-matters';

export const PlugScoreSlider = () => {
  const [value, setValue] = useState(0);
  const globalStyles = useGlobalStyles();
  const {colors} = useAppTheme();

  // Render the slider description based on value
  const renderDescription = () => {
    if (value <= 1) {
      return 'Location will not be filtered by PlugScore';
    }
    return `Location with a PlugScore of ${value} or greater will be visible.`;
  };

  return (
    <View style={{}}>
      <Text style={globalStyles.textStyles('labelLarge', colors.text)}>
        PlugScore
      </Text>
      <View style={styles.sliderRow}>
        <View style={styles.sliderContainer}>
          <Slider
            value={value}
            onValueChange={setValue}
            maximumValue={10}
            minimumValue={0}
            step={1}
            orientation="horizontal"
            allowTouchTrack
            thumbStyle={styles.thumbStyle}
            thumbTintColor="white"
            thumbProps={{
              children: <View style={styles.circleStyle} />,
            }}
          />
        </View>
        <Text
          style={[
            styles.scoreValue,
            {
              backgroundColor: value > 5 ? colors.primary : colors.gray,
              color: colors.white,
            },
          ]}>
          {value}
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text
          style={[
            globalStyles.textStyles('labelSmall', colors.text),
            styles.descriptionText,
          ]}>
          {renderDescription()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderContainer: {
    flex: 1,
  },
  thumbStyle: {
    height: 28,
    width: 28,
    marginBottom: 4,
  },
  circleStyle: {
    height: 28,
    width: 28,
    backgroundColor: 'white',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  scoreValue: {
    height: vs(20),
    width: s(24),
    borderRadius: 5,
    marginLeft: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 5,
  },
  descriptionContainer: {
    alignSelf: 'center',
    width: '50%',
  },
  descriptionText: {
    textAlign: 'center',
  },
});
