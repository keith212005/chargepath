import {STATION_COUNT} from '@constants';
import {useAppTheme} from '@hooks';
import {ButtonGroup} from '@rneui/themed';
import {useGlobalStyles} from '@utils';
import React from 'react';
import {Text, View} from 'react-native';
import {vs} from 'react-native-size-matters';

export const StationCount = () => {
  const [index, setIndex] = React.useState(0);
  const globalStyles = useGlobalStyles();
  const {colors} = useAppTheme();

  return (
    <>
      <View style={{}}>
        <Text
          style={[
            globalStyles.textStyles('labelLarge', colors.text),

            {marginVertical: vs(10), marginTop: vs(40)},
          ]}>
          Station Count
        </Text>
        <ButtonGroup
          buttons={STATION_COUNT}
          onPress={index => setIndex(index)}
          selectedIndex={index}
          containerStyle={{
            borderRadius: 20,
            width: '100%',
            marginLeft: -1,
            backgroundColor: colors.card,
          }}
          buttonContainerStyle={{}}
          selectedButtonStyle={{backgroundColor: colors.text}}
          selectedTextStyle={globalStyles.textStyles(
            'labelMedium',
            colors.background,
          )}
          textStyle={globalStyles.textStyles('labelMedium', colors.text)}
        />
      </View>
    </>
  );
};
