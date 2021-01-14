import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import TopSearchBar from '../components/TopSearchBar';
import BannerList from '../components/BannerList';
import CardList from '../components/CardList';

const InfluencerFilterScreen = (props) => {
  const { navigation } = props;

  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('');

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
      province: 'Sumatera Utara',
      city: 'Medan',
      description: 'I am active in Blog and a few facts about my website\:\nMost viewed blog: 359200 likes10000-12000 likes per blog (Top commented: 174 comments)\nNo bots or like/comments services used.\nEverything is real\.\n\nTips for getting the most of the shoutout\:\nSend a high quality picture (or video).\nUse an engaging caption.\nGetting a decent amount of followers on your account can help a bit\n\nVisit my Instagram at @adel_le\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.',
      price: 350000,
    },
    {
      source: 'https://katherinecalnan.com/wp-content/uploads/sb-instagram-feed-images/124804777_189531592673432_746234738064300489_nlow.jpg',
      name: 'Maria Rssds sdsds',
      subcategory: 'Fashion Model',
      province: 'DKI Jakarta',
      city: 'Jakarta',
      description: 'I am active in Instagram and a few facts about my account\:\nMost liked photo: 35900 likes10000-12000 likes per post (Top commented: 174 comments)\nNo bots or like/comments services used.\nEverything is real\.\n\nTips for getting the most of the shoutout\:\nSend a high quality picture (or video).\nUse an engaging caption.\nGetting a decent amount of followers on your account can help a bit\n\nVisit my Instagram at @adel_le\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.',
      price: 350000,
    },
    {
      source: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      name: 'Adelle',
      subcategory: 'Make Up Model',
      province: 'DI Jogjakarta',
      city: 'Jogjakarta',
      description: 'I am active in Instagram and a few facts about my account\:\nMost liked photo: 35900 likes10000-12000 likes per post (Top commented: 174 comments)\nNo bots or like/comments services used.\nEverything is real\.\n\nTips for getting the most of the shoutout\:\nSend a high quality picture (or video).\nUse an engaging caption.\nGetting a decent amount of followers on your account can help a bit\n\nVisit my Instagram at @adel_le\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.',
      price: 350000,
    },
    {
      source: 'https://starngage.com/wp-content/uploads/2019/05/1.-Magdalena.jpg',
      name: 'Sasa',
      subcategory: 'Food Blogger',
      province: 'DI Jogjakarta',
      city: 'Jogjakarta',
      description: 'I am active in Blog and a few facts about my website\:\nMost viewed blog: 359200 likes10000-12000 likes per blog (Top commented: 174 comments)\nNo bots or like/comments services used.\nEverything is real\.\n\nTips for getting the most of the shoutout\:\nSend a high quality picture (or video).\nUse an engaging caption.\nGetting a decent amount of followers on your account can help a bit\n\nVisit my Instagram at @adel_le\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.',
      price: 350000,
    },
  ]);

  return (
    <View style={styles.container}>
      <TopSearchBar
        isFocused={true}
        onChangeText={(search) => { setSearch(search); }}
        value={search} />

      <ScrollView style={styles.scrollViewContainer}>
        { category.length === 0 && search.length === 0 &&
          <BannerList
            title="Categories"
            items={categories}
            onPressHandler={setCategory} />
        }
        <CardList
          title={(category ? category + " " : "") + "Influencers"}
          items={influencers}
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