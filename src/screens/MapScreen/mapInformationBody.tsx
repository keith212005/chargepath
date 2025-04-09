import React from 'react';
import {useAppTheme} from '@hooks';
import {ButtonGroup, Divider, Icon, Switch} from '@rneui/themed';
import {setMapType, setShowScale, setShowTraffic} from '@slice';
import {useAppDispatch, useAppSelector} from '@store';
import {responsiveHeight, useGlobalStyles} from '@utils';
import {StyleSheet, View, Text} from 'react-native';
import {LEGENDS} from '@constants';

export const MapInformationBody = () => {
  const dispatch = useAppDispatch();
  const globalStyles = useGlobalStyles();
  const {colors} = useAppTheme();
  const {showTraffic, showScale, mapType} = useAppSelector(
    state => state.mapType,
  );

  const handleToggle = (index: number, selected: boolean) => {
    const actions = [setShowTraffic, setShowScale];
    dispatch(actions[index](!selected));
  };

  const renderToggleRow = (
    label: string,
    selected: boolean,
    onToggle: () => void,
  ) => (
    <View
      style={[
        globalStyles.layoutDirection('row', 'space-between', 'center'),
        styles.rowContainer,
      ]}>
      <Text style={globalStyles.textStyle('_15', 'text', 'U_REG')}>
        {label}
      </Text>
      <Switch color={colors.text} value={selected} onValueChange={onToggle} />
    </View>
  );

  const handleMapTypeChange = (index: number) => dispatch(setMapType(index));

  const MapLayers = () => (
    <View
      style={globalStyles.layoutDirection(
        'column',
        'flex-start',
        'flex-start',
      )}>
      <Text
        style={[
          globalStyles.textStyle('_12', 'text', 'U_BOLD'),
          styles.sectionTitle,
        ]}>
        MAP LAYERS
      </Text>
      <ButtonGroup
        buttons={['Standard', 'Satellite', 'Hybrid']}
        onPress={handleMapTypeChange}
        selectedIndex={mapType.index}
        containerStyle={styles.buttonGroupContainer}
        selectedButtonStyle={{backgroundColor: colors.text}}
        selectedTextStyle={globalStyles.textStyle(
          '_15',
          colors.background,
          'U_BOLD',
        )}
        textStyle={globalStyles.textStyle('_15', colors.text, 'U_BOLD')}
      />
      <View style={[styles.mapLayersRowContainer, {borderColor: colors.text}]}>
        {mapType.index !== 1 &&
          renderToggleRow('Show Traffic', showTraffic, () =>
            handleToggle(0, showTraffic),
          )}
        {mapType.index !== 1 && <Divider />}
        {renderToggleRow('Show Scale', showScale, () =>
          handleToggle(1, showScale),
        )}
      </View>
    </View>
  );

  const renderLegendRow = (
    label: string,
    iconType: string,
    iconName: string,
    iconColor: string,
  ) => (
    <View
      key={label}
      style={[
        globalStyles.layoutDirection('row', 'flex-start', 'center'),
        styles.legendRow,
      ]}>
      <Icon
        name={iconName}
        type={iconType}
        size={26}
        color={iconColor}
        style={styles.icon}
      />
      <Text style={globalStyles.textStyle('_15', 'text', 'U_REG')}>
        {label}
      </Text>
    </View>
  );

  const MapLegends = () => {
    return (
      <View style={styles.legendsContainer}>
        <Text style={globalStyles.textStyle('_12', 'text', 'U_BOLD')}>
          MAP LEGENDS
        </Text>
        <View
          style={[
            globalStyles.layoutDirection('row', 'space-between', 'flex-start'),
            styles.mapLegendRowContainer,
            {borderColor: colors.text},
          ]}>
          <View style={styles.legendColumn}>
            {LEGENDS.slice(0, 3).map(({label, iconType, iconName, iconColor}) =>
              renderLegendRow(label, iconType, iconName, iconColor),
            )}
          </View>
          <View style={styles.legendColumn}>
            {LEGENDS.slice(3).map(({label, iconType, iconName, iconColor}) =>
              renderLegendRow(label, iconType, iconName, iconColor),
            )}
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
  sectionTitle: {
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonGroupContainer: {
    borderRadius: 50,
    borderWidth: 1,
    width: '100%',
    marginLeft: -1,
  },
  mapLayersRowContainer: {
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  rowContainer: {
    paddingVertical: responsiveHeight(1),
    width: '100%',
  },
  legendsContainer: {
    marginTop: 20,
  },
  mapLegendRowContainer: {
    borderWidth: 0.2,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  legendRow: {
    paddingVertical: 12,
  },
  legendColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  icon: {
    paddingRight: 10,
  },
});
