import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import NewsList from '../components/NewsList';

const NewsScreen = (props) => {
  const { news } = props;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <NewsList items={news} />
      </ScrollView>
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
})