import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';

import TopSearchBar from '../components/TopSearchBar';
import BannerList from '../components/BannerList';
import CardList from '../components/CardList';

const InfluencerFilterScreen = (props) => {
  const { navigation } = props;

  const [isLoading, setIsLoading] = React.useState(true);

  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [categoryKey, setCategoryKey] = React.useState('');

  const [categories, setCategories] = React.useState();
  const [influencers, setInfluencers] = React.useState();

  React.useEffect(() => {
    database()
      .ref('/categories/influencers')
      .once('value', (snapshot) => {
        let category_arr = [];
        snapshot.forEach((item) => {
          category_arr.push({
            ...item.val(),
            key: item.key,
          })
        });
        setCategories(category_arr);
      });
  }, []);

  React.useEffect(() => {
    database()
      .ref('/influencers/')
      .on('value', (snapshot) => {
        let influencer_arr = [];
        snapshot.forEach((item) => {
          influencer_arr.push(item.val());
        });
        setInfluencers(influencer_arr);
      });
  }, []);

  React.useEffect(() => {
    setIsLoading(!categories?.length || !influencers);
  }, [categories, influencers]);

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TopSearchBar
        isFocused={true}
        onChangeText={(search) => { setSearch(search); }}
        value={search} />

      <ScrollView style={styles.scrollViewContainer}>
        <BannerList
          title="Categories"
          items={categories}
          onPressHandler={(value, key) => {
            setCategory(value);
            setCategoryKey(key);
          }} />
        <CardList
          title={(category ? category + " " : "") + "Influencers"}
          items={influencers.filter((influencer) => {
            return influencer.name.toLowerCase().includes(search.toLowerCase()) && (categoryKey === '' || categoryKey === influencer.category);
          })}
          navigation={navigation}
          navigateTo="InfluencerDetail" />
      </ScrollView>
    </View>
  );
};

export default InfluencerFilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 24,
  }
});