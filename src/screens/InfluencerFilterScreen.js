import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import TopSearchBar from '../components/TopSearchBar';

const InfluencerFilterScreen = (props) => {
  const { navigation } = props;

  const [search, setSearch] = React.useState('');

  const [categories, setCategories] = React.useState([
    'Art', 'Athlete', 
    'Blogger', 'Model', 
    'Photographer', 'Public Figure',
  ]);

  return (
    <>
      <TopSearchBar
        isFocused={true}
        onChangeText={(search) => { setSearch(search); }}
        value={search} />

      <ScrollView style={styles.container}>
        {/* <CategoryList /> */}
      </ScrollView>
    </>
  );
};

export default InfluencerFilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  premiumCarousel: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginVertical: 12,
  },
  categoryCarousel: {
    marginBottom: 40,
  },
});