import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SearchBar } from 'react-native-elements';

const TopSearchBar = (props) => {
  const { onFocus, value, onChangeText, isFocused = false } = props;

  const searchBarRef = React.useRef();

  React.useEffect(() => {
    if (isFocused) {
      searchBarRef.current.focus();
    }
  }, []);

  return (
    <SearchBar
      ref={searchBarRef}
      lightTheme={true}
      round={true}
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      placeholder="Search"
      onFocus={onFocus}
      onChangeText={onChangeText}
      value={value}
    />
  )
};

export default TopSearchBar;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: null,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
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