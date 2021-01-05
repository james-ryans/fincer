import * as React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import TopSearchBar from '../components/TopSearchBar';

const InfluencerScreen = ({ navigation, route }) => {
  return (
    <View>
      <TopSearchBar />
      <Text>WKWK</Text>
    </View>
  );
};

export default InfluencerScreen;