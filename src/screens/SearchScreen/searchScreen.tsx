import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import 'react-native-get-random-values';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import {Input, Icon, Divider} from '@rneui/themed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useGlobalStyles} from '@utils';
import {useAppTheme} from '@hooks';
import {goBack} from '@navigators';

const query = {
  key: process.env.GOOGLE_MAPS_API_KEY,
  language: 'en',
  types: 'address',
};

export const SearchScreen = () => {
  const inputRef = React.useRef<GooglePlacesAutocompleteRef>(null);
  const insets = useSafeAreaInsets();
  const globalStyles = useGlobalStyles();
  const {colors} = useAppTheme();

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const SearchBar = () => {
    return (
      <View
        style={[
          globalStyles.layoutDirection('row', 'center', 'center'),
          {
            paddingTop: insets.top,
            backgroundColor: colors.black,
          },
        ]}>
        <GooglePlacesAutocomplete
          ref={inputRef}
          placeholder="Search"
          minLength={2} // minimum length of text to search
          predefinedPlaces={[]}
          debounce={200}
          query={query}
          fetchDetails={true}
          onPress={(data, details) => {}}
          onFail={error => console.error(error)}
          textInputProps={{
            InputComp: Input,
            leftIcon: {
              type: 'ionicon',
              name: 'search',
              color: colors.white,
            },
            rightIcon: (
              <TouchableOpacity
                style={{paddingHorizontal: 5}}
                onPress={() => goBack()}>
                <Text
                  style={globalStyles.textStyle('_14', colors.white, 'U_BOLD')}>
                  Cancel
                </Text>
              </TouchableOpacity>
            ),
            inputContainerStyle: {
              borderBottomWidth: 0, // This is to remove underline of the input
            },
          }}
          styles={{
            container: {},
            textInputContainer: {
              borderBottomWidth: 0.2,
              borderColor: colors.icon,
            },
            textInput: {
              borderWidth: 1, // This is the border of the input
            },
          }}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <SearchBar />
    </View>
  );
};

const styles = StyleSheet.create({});
