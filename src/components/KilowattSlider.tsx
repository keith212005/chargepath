import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Icon, Slider} from '@rneui/themed';
import {useAppTheme} from '@hooks';
import {useGlobalStyles} from '@utils';
import {vs, s, scale, ms} from 'react-native-size-matters';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export const KilowattSlider = () => {
  const [value, setValue] = useState(0);
  const globalStyles = useGlobalStyles();
  const {colors} = useAppTheme();
  const [range, setRange] = useState([0, 350]);

  return (
    <View style={{paddingTop: 20}}>
      <Text style={globalStyles.textStyles('labelLarge', colors.text)}>
        Kilowatt Range
      </Text>
      <Text
        style={[
          globalStyles.textStyles('labelMedium', colors.text),
          {textAlign: 'center', marginTop: vs(12)},
        ]}>
        {range[0]}kW - {range[1]} kW
      </Text>
      <View style={{alignItems: 'center'}}>
        <MultiSlider
          sliderLength={scale(280)}
          values={range}
          onValuesChange={setRange}
          min={0}
          max={350}
          step={1}
          selectedStyle={{backgroundColor: '#0057D9'}}
          unselectedStyle={{backgroundColor: '#ddd'}}
          customMarker={e => (
            <View
              style={[
                styles.thumbBase,
                e.currentValue === range[0]
                  ? styles.leftThumb
                  : styles.rightThumb,
              ]}
            />
          )}
        />
      </View>
      <View style={styles.rangeTextContainer}>
        <Text
          style={[
            styles.rangeText,
            // {flex: 2},
            globalStyles.textStyles('labelSmall', colors.text),
          ]}>
          0
        </Text>

        <View
          style={[
            globalStyles.layoutDirection('row', 'center', 'center'),
            {flex: 8},
          ]}>
          {range[0] > 22 && (
            <>
              <Icon
                name="lightning-bolt-circle"
                type="material-community"
                size={20}
                color={colors.gray}
              />
              <Text
                style={[
                  styles.rangeText,
                  globalStyles.textStyles('labelSmall', colors.text),
                ]}>
                Fast charging enabled
              </Text>
            </>
          )}
        </View>

        <Text
          style={[
            styles.rangeText,
            {textAlign: 'right'},
            globalStyles.textStyles('labelSmall', colors.text),
          ]}>
          350+
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  thumbBase: {
    width: 16,
    height: 32,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  leftThumb: {
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rightThumb: {
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  rangeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: s(18),
  },
  rangeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
});
