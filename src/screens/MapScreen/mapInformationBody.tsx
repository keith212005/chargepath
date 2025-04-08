import {useAppTheme} from '@hooks';
import {ButtonGroup, Divider, Icon, Switch} from '@rneui/themed';
import {setMapType, setShowScale, setShowTraffic} from '@slice';
import {useAppDispatch, useAppSelector} from '@store';
import {responsiveHeight, useGlobalStyles} from '@utils';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';

export const MapInformationBody = () => {
  const dispatch = useAppDispatch();
  const globalStyles = useGlobalStyles();
  const {colors} = useAppTheme();
  console.log('colors', colors);

  const {showTraffic, showScale, mapType} = useAppSelector(
    state => state.mapType,
  );

  const MapLayers = () => {
    const renderShowRow = (index: number, label: string, selected: boolean) => {
      const handleShowTrafficOrScale = () => {
        switch (index) {
          case 0:
            dispatch(setShowTraffic(!selected));
            break;
          case 1:
            dispatch(setShowScale(!selected));
            break;
          default:
            break;
        }
      };
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
            onValueChange={handleShowTrafficOrScale}
          />
        </View>
      );
    };

    const handleSelctedMapType = (index: number) => {
      switch (index) {
        case 0:
          dispatch(setMapType(0));
          break;
        case 1:
          dispatch(setMapType(1));
          break;
        case 2:
          dispatch(setMapType(2));
          break;
        default:
          break;
      }
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
          onPress={selectedIdx => handleSelctedMapType(selectedIdx)}
          selectedButtonStyle={{backgroundColor: colors.text}}
          selectedIndex={mapType.index}
          selectedTextStyle={[
            globalStyles.textStyle('_15', colors.background, 'U_BOLD'),
            {},
          ]}
          textStyle={[globalStyles.textStyle('_15', colors.text, 'U_BOLD'), {}]}
        />

        {/* Show Traffic & Scale container*/}
        <View
          style={[{borderColor: colors.text}, styles.mapLayersRowContainer]}>
          {mapType.index != 1 && renderShowRow(0, 'Show Traffic', showTraffic)}
          {mapType.index != 1 && <Divider />}
          {renderShowRow(1, 'Show Scale', showScale)}
        </View>
      </View>
    );
  };

  const MapLegends = () => {
    const renderLegendRow = (
      label: string,
      iconType: string,
      iconName: string,
      iconColor: string,
    ) => (
      <View
        style={[
          globalStyles.layoutDirection('row', 'flex-start', 'center'),
          {paddingVertical: 12},
        ]}>
        <Icon
          name={iconName}
          type={iconType}
          size={26}
          color={iconColor}
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
            {renderLegendRow(
              'Restricted',
              'font-awesome-5',
              'map-marker',
              colors.brwn_mk,
            )}
            {renderLegendRow(
              'In Use',
              'font-awesome-5',
              'map-marker',
              colors.gry_mk,
            )}
            {renderLegendRow(
              'Residential',
              'material-community',
              'home-circle',
              colors.text,
            )}
          </View>
          <View
            style={{flexDirection: 'column', justifyContent: 'space-between'}}>
            {renderLegendRow(
              'Level 2',
              'font-awesome-5',
              'map-marker',
              colors.gre_mk,
            )}
            {renderLegendRow(
              'High Power',
              'font-awesome-5',
              'map-marker',
              colors.yel_mk,
            )}
            {renderLegendRow(
              'Under Repair',
              'ionicon',
              'construct',
              colors.gry_mk,
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
