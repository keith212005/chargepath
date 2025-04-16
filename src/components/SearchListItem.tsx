import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {Icon, Divider} from '@rneui/themed';
import {useAppTheme} from '@hooks';
import {
  calculateDistance,
  hasFastCharger,
  metersToKm,
  useGlobalStyles,
} from '@utils';
import {GreenChargerMarker, OrangeChargerMarker} from '@assets';

interface SearchListItemProps {
  item: any;
  onPress: () => void;
}

export const SearchListItem = ({item, onPress}: SearchListItemProps) => {
  const globalStyles = useGlobalStyles();
  const {colors} = useAppTheme();
  const isFastChargerAvailable = hasFastCharger(item?.connections);

  const renderIcon = () => {
    if (item.primaryText) {
      return (
        <Icon
          name="map"
          type="fontisto"
          size={24}
          color={colors.text}
          containerStyle={styles.iconContainer}
        />
      );
    }
    return (
      <View style={styles.iconContainer}>
        {isFastChargerAvailable ? (
          <OrangeChargerMarker width={25} height={45} />
        ) : (
          <GreenChargerMarker width={25} height={45} />
        )}
      </View>
    );
  };

  const renderPrimaryContent = () => (
    <View
      style={[
        globalStyles.layoutDirection('column', 'flex-start', 'flex-start'),
        styles.content,
      ]}>
      <Text style={[globalStyles.textStyles('labelLarge', colors.text)]}>
        {item.primaryText}
      </Text>
      <Text style={[globalStyles.textStyles('labelSmall', colors.text)]}>
        {item.secondaryText}
      </Text>
      <Text style={[globalStyles.textStyles('labelSmall', colors.text)]}>
        {item.distanceMeters && metersToKm(item.distanceMeters)}
      </Text>
    </View>
  );

  const renderSecondaryContent = () => (
    <View
      style={[
        globalStyles.layoutDirection('column', 'flex-start', 'flex-start'),
        styles.content,
      ]}>
      <Text
        style={[globalStyles.textStyles('labelLarge', colors.text)]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.addressInfo.title}
      </Text>
      <Text style={[globalStyles.textStyles('labelSmall', colors.text)]}>
        {item.addressInfo.addressLine1}, {item.addressInfo.town},{' '}
        {item.addressInfo.stateOrProvince} {item.addressInfo.postcode}
      </Text>
      <Text style={[globalStyles.textStyles('labelSmall', colors.text)]}>
        {calculateDistance(item)}
      </Text>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        style={[
          styles.listItem,
          globalStyles.layoutDirection('row', 'flex-start', 'center'),
        ]}
        onPress={onPress}>
        {renderIcon()}
        {item.primaryText ? renderPrimaryContent() : renderSecondaryContent()}
      </TouchableOpacity>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  iconContainer: {
    paddingRight: 10,
  },
  content: {
    flex: 1,
  },
});
