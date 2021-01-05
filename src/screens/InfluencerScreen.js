import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import TopSearchBar from '../components/TopSearchBar';

const InfluencerScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <TopSearchBar />
      <Text>WKWK</Text>
    </View>
  );
};

export default InfluencerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  }
});