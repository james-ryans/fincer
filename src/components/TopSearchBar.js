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
    padding: 15,
  },
  inputContainer: {
    backgroundColor: '#F2F2F2',
    minHeight: 20,
  },
  input: {
    fontSize: 16,
  },
});