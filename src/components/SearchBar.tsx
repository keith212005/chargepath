import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Icon} from '@rneui/themed';
import {useGlobalStyles} from '@utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppTheme} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {ms} from 'react-native-size-matters';

// Define the type for the ref
export interface SearchBarRef {
  clearInput: () => void;
}

interface SearchBarProps {
  onChangeText: (text: string) => void;
  onPressClear: () => void;
}

export const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(
  ({onChangeText, onPressClear}, ref) => {
    const inputRef = useRef<TextInput>(null);
    const globalStyles = useGlobalStyles();
    const {colors} = useAppTheme();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    // Expose the clearInput function via the ref
    useImperativeHandle(ref, () => ({
      clearInput: () => {
        if (inputRef.current) {
          inputRef.current.clear(); // Clear the TextInput value
        } else {
          console.warn('Input reference is null'); // Log a warning if inputRef is null
        }
      },
    }));

    return (
      <View
        style={[
          {
            backgroundColor: colors.darkCard,
            paddingTop: Platform.OS === 'ios' ? insets.top : 10,
          },
          styles.container,
          globalStyles.layoutDirection('row', 'flex-start', 'center'),
        ]}>
        {/* Search Icon */}
        <Icon name="search" type="ionicon" size={30} color={colors.white} />

        {/* Text Input */}
        <View
          style={[
            {flex: 1},
            globalStyles.layoutDirection('row', 'space-between', 'center'),
          ]}>
          <TextInput
            ref={inputRef}
            style={[styles.input, {color: colors.black}]}
            placeholder="Search"
            placeholderTextColor={colors.icon}
            onChangeText={onChangeText} // Update the query state
          />

          {/* Clear Button */}
          <TouchableOpacity style={styles.clearButton} onPress={onPressClear}>
            <Icon name="cross" type="entypo" size={24} color={colors.gray} />
          </TouchableOpacity>
        </View>

        {/* Cancel Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[globalStyles.textStyles('labelMedium', colors.white)]}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(10),
    borderBottomWidth: 0.2,
    borderColor: 'gray',
    paddingVertical: ms(10),
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: ms(10),
    paddingVertical: Platform.OS === 'ios' ? 18 : 12,
    marginHorizontal: ms(5),
    marginVertical: ms(10),
  },
  clearButton: {
    position: 'absolute',
    right: ms(12),
  },
});
