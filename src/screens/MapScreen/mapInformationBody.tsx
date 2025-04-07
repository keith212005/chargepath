import {useAppTheme} from '@hooks';
import {useTheme} from '@react-navigation/native';
import {ButtonGroup, Divider, Icon, Switch} from '@rneui/themed';
import {useAppSelector} from '@store';
import {responsiveHeight, useGlobalStyles} from '@utils';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';

export const MapInformationBody = () => {
  const globalStyles = useGlobalStyles();
  const {colors} = useAppTheme();
  const isDark = useAppSelector(state => state.theme.currentTheme === 'dark');

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [selectedIndexes, setSelectedIndexes] = React.useState([]);
  const [selected, setSelected] = React.useState(true);

  const MapLayers = () => {
    const renderShowRow = (label: string) => {
      return (
        <View
          style={[
            globalStyles.layoutDirection('row', 'space-between', 'center'),
            {paddingVertical: responsiveHeight(1), width: '100%'},
          ]}>
          <Text style={globalStyles.textStyle('_15', 'text', 'U_REG')}>
            {label}
          </Text>
          <Switch
            color={colors.text}
            value={selected}
            onValueChange={() => setSelected(!selected)}
          />
        </View>
      );
    };

    return (
      <View
        style={[
          globalStyles.layoutDirection('column', 'flex-start', 'flex-start'),
        ]}>
        <Text
          style={[
            globalStyles.textStyle('_12', 'text', 'U_BOLD'),
            {paddingVertical: 10, marginTop: 10},
          ]}>
          MAP LAYERS
        </Text>
        <ButtonGroup
          buttonStyle={{backgroundColor: colors.card}}
          buttonContainerStyle={{}}
          buttons={['Standard', 'Satellite', 'Hybrid']}
          containerStyle={{borderRadius: 50, overflow: 'hidden'}}
          disabledStyle={{}}
          disabledTextStyle={{}}
          disabledSelectedStyle={{}}
          disabledSelectedTextStyle={{}}
          innerBorderStyle={{}}
          onPress={selectedIdx => setSelectedIndex(selectedIdx)}
          selectedButtonStyle={{
            backgroundColor: isDark ? colors.text : colors.text,
          }}
          selectedIndex={selectedIndex}
          selectedIndexes={selectedIndexes}
          selectedTextStyle={[
            globalStyles.textStyle('_15', colors.background, 'U_BOLD'),
            {},
          ]}
          textStyle={[globalStyles.textStyle('_15', colors.text, 'U_BOLD'), {}]}
        />

        {/* Show Traffic & Scale container*/}
        <View
          style={[{borderColor: colors.text}, styles.mapLayersRowContainer]}>
          {renderShowRow('Show Traffic')}
          <Divider />
          {renderShowRow('Show Scale')}
        </View>
      </View>
    );
  };

  const MapLegends = () => {
    const renderLegendRow = (
      label: string,
      iconType: string,
      iconName: string,
    ) => (
      <View
        style={[
          globalStyles.layoutDirection('row', 'flex-start', 'center'),
          {paddingVertical: 12},
        ]}>
        <Icon
          name={iconName}
          type={iconType}
          size={20}
          color={'brown'}
          style={{paddingRight: 10}}
        />
        <Text style={globalStyles.textStyle('_15', 'text', 'U_REG')}>
          {label}
        </Text>
        <View
          style={[
            globalStyles.layoutDirection('row', 'flex-start', 'center'),
            {paddingLeft: 10},
          ]}></View>
      </View>
    );

    return (
      <View style={{marginTop: 20}}>
        <Text style={globalStyles.textStyle('_12', 'text', 'U_BOLD')}>
          MAP LEGENDS
        </Text>

        {/* Map Legend Row Container */}
        <View
          style={[
            globalStyles.layoutDirection('row', 'space-between', 'flex-start'),
            styles.mapLegendRowContainer,
            {borderColor: colors.text},
          ]}>
          <View
            style={{flexDirection: 'column', justifyContent: 'space-between'}}>
            {renderLegendRow('Restricted', 'font-awesome-5', 'map-marker')}
            {renderLegendRow('In Use', 'font-awesome-5', 'map-marker')}
            {renderLegendRow('Residential', 'font-awesome-5', 'map-marker')}
          </View>
          <View
            style={{flexDirection: 'column', justifyContent: 'space-between'}}>
            {renderLegendRow('Level 2', 'font-awesome-5', 'map-marker')}
            {renderLegendRow('High Power', 'font-awesome-5', 'map-marker')}
            {renderLegendRow('Under Repair', 'font-awesome-5', 'map-marker')}
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <MapLayers />
      <MapLegends />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mapLegendRowContainer: {
    borderWidth: 0.2,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  mapLayersRowContainer: {
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});
