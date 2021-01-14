import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { debounce, throttle } from 'lodash';

import TopSearchBar from '../components/TopSearchBar';
import PremiumCarousel from '../components/PremiumCarousel';
import CategoryCarousel from '../components/CategoryCarousel';

const InfluencerScreen = (props) => {
  const { navigation } = props;

  const [premiumCarouselItems, setPremiumCarouselItems] = React.useState([
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
      source: 'https://starngage.com/wp-content/uploads/2019/05/1.-Magdalena.jpg',
      name: 'Sasa',
      subcategory: 'Food Blogger',
      province: 'DKI Jakarta',
      city: 'Jakarta',
      description: 'I am active in Instagram and a few facts about my account\:\nMost liked photo: 35900 likes10000-12000 likes per post (Top commented: 174 comments)\nNo bots or like/comments services used.\nEverything is real\.\n\nTips for getting the most of the shoutout\:\nSend a high quality picture (or video).\nUse an engaging caption.\nGetting a decent amount of followers on your account can help a bit\n\nVisit my Instagram at @adel_le\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.',
      price: 350000,
    },
    {
      source: 'https://www.onblastblog.com/wp-content/uploads/2017/08/how-to-become-a-lifestyle-blogger.jpg',
      name: 'Twins',
      subcategory: 'Lifestyle Content Creator',
      province: 'DKI Jakarta',
      city: 'Jakarta',
      description: 'I am active in Instagram and a few facts about my account\:\nMost liked photo: 35900 likes10000-12000 likes per post (Top commented: 174 comments)\nNo bots or like/comments services used.\nEverything is real\.\n\nTips for getting the most of the shoutout\:\nSend a high quality picture (or video).\nUse an engaging caption.\nGetting a decent amount of followers on your account can help a bit\n\nVisit my Instagram at @adel_le\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.',
      price: 350000,
    },
    {
      source: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      name: 'Adelle',
      subcategory: 'Make Up Model',
      province: 'DKI Jakarta',
      city: 'Jakarta',
      description: 'I am active in Instagram and a few facts about my account\:\nMost liked photo: 35900 likes10000-12000 likes per post (Top commented: 174 comments)\nNo bots or like/comments services used.\nEverything is real\.\n\nTips for getting the most of the shoutout\:\nSend a high quality picture (or video).\nUse an engaging caption.\nGetting a decent amount of followers on your account can help a bit\n\nVisit my Instagram at @adel_le\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.',
      price: 350000,
    },
  ]);

  const [categoryCarousel, setCategoryCarousel] = React.useState([
    {
      title: 'Model',
      items: [
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
      ],
    },
    {
      title: 'Blogger',
      items: [
        {
          source: 'https://starngage.com/wp-content/uploads/2019/05/1.-Magdalena.jpg',
          name: 'Sasa',
          subcategory: 'Food Blogger',
          province: 'DI Jogjakarta',
          city: 'Jogjakarta',
          description: 'I am active in Blog and a few facts about my website\:\nMost viewed blog: 359200 likes10000-12000 likes per blog (Top commented: 174 comments)\nNo bots or like/comments services used.\nEverything is real\.\n\nTips for getting the most of the shoutout\:\nSend a high quality picture (or video).\nUse an engaging caption.\nGetting a decent amount of followers on your account can help a bit\n\nVisit my Instagram at @adel_le\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.',
          price: 350000,
        },
        {
          source: 'https://images.pexels.com/photos/6469/red-hands-woman-creative.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          name: 'SCURD',
          subcategory: 'Comedy Blogger',
          province: 'Sumatera Utara',
          city: 'Medan',
          description: 'I am active in Blog and a few facts about my website\:\nMost viewed blog: 359200 likes10000-12000 likes per blog (Top commented: 174 comments)\nNo bots or like/comments services used.\nEverything is real\.\n\nTips for getting the most of the shoutout\:\nSend a high quality picture (or video).\nUse an engaging caption.\nGetting a decent amount of followers on your account can help a bit\n\nVisit my Instagram at @adel_le\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.',
          price: 350000,
        },
      ],
    }
  ]);

  const onFocusHandler = debounce(() => {
    navigation.navigate('InfluencerFilter');
  }, 2000, { leading: true, trailing: false });

  return (
    <ScrollView>
      <View style={styles.container}>
        <TopSearchBar
          onFocus={onFocusHandler} />
        <PremiumCarousel 
          containerStyle={styles.premiumCarousel}
          carouselItems={premiumCarouselItems}
          navigation={navigation}
          navigateTo="InfluencerDetail" />
        { categoryCarousel.map((category, index) => {
            return <CategoryCarousel 
              key={index}
              containerStyle={styles.categoryCarousel}
              carouselItems={category}
              navigation={navigation}
              navigateTo="InfluencerDetail" />
          })
        }
      </View>
    </ScrollView>
  );
};

export default InfluencerScreen;

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