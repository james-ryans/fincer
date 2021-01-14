import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import TopSearchBar from '../components/TopSearchBar';
import BannerList from '../components/BannerList';
import CardList from '../components/CardList';

const InfluencerFilterScreen = (props) => {
  const { navigation } = props;

  const [search, setSearch] = React.useState('');

  const [categories, setCategories] = React.useState([
    { text: 'Art', backgroundColor: '#FA744F'},
    { text: 'Athlete', backgroundColor: '#16817A'},
    { text: 'Blogger', backgroundColor: '#FF5D6C'},
    { text: 'Model', backgroundColor: '#EC9B3B'},
    { text: 'Photographer', backgroundColor: '#10316B'},
    { text: 'Public Figure', backgroundColor: '#FF9E74'},
  ]);

  const [influencers, setInfluencers] = React.useState([
    {
      source: 'https://images.pexels.com/photos/6469/red-hands-woman-creative.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'SCURD',
      subcategory: 'Comedy Blogger',
    },
    {
      source: 'https://katherinecalnan.com/wp-content/uploads/sb-instagram-feed-images/124804777_189531592673432_746234738064300489_nlow.jpg',
      name: 'Maria Rssds sdsds',
      subcategory: 'Fashion Model',
    },
    {
      source: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      name: 'Adelle',
      subcategory: 'Make Up Model',
    },
    {
      source: 'https://starngage.com/wp-content/uploads/2019/05/1.-Magdalena.jpg',
      name: 'Sasa',
      subcategory: 'Food Blogger',
    },
  ]);

  return (
    <View style={styles.container}>
      <TopSearchBar
        isFocused={true}
        onChangeText={(search) => { setSearch(search); }}
        value={search} />

      <ScrollView style={styles.scrollViewContainer}>
        { search.length === 0 &&
          <BannerList
            title="Categories"
            items={categories} />
        }
        <CardList
          title="Influencers"
          items={influencers} />
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