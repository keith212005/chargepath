import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useDebounce, usePlacePredictions} from '@hooks';
import {Loader, SearchBar, SearchBarRef, SearchListItem} from '@components';

export const SearchScreen = () => {
  const searchBarRef = React.useRef<SearchBarRef>(null);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const {predictions, loadingPrediction} = usePlacePredictions(debouncedQuery);

  return (
    <View style={[styles.container]}>
      {/* Search Bar */}
      <SearchBar
        ref={searchBarRef}
        onChangeText={setQuery}
        onPressClear={() => {
          setQuery('');
          searchBarRef.current?.clearInput();
        }}
      />

      {/* Predictions List */}
      <FlatList
        data={predictions}
        ListHeaderComponent={() => <Loader show={loadingPrediction} />}
        keyExtractor={(item, index) => item.placeID || index.toString()}
        renderItem={({item}) => (
          <SearchListItem item={item} onPress={() => {}} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
