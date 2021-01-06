import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

const TopSearchBar = () => {
  const [search, setSearch] = React.useState('');

  return (
    <SearchBar
      lightTheme={true}
      round={true}
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      placeholder="Search"
      onChangeText={(search) => { setSearch(search) }}
      value={search}
    />
  )
};

export default TopSearchBar;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: null,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  inputContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    height: 40,
  },
  input: {
    fontSize: 16,
  },
});