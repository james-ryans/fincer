import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import TopSearchBar from '../components/TopSearchBar';
import PremiumCarousel from '../components/PremiumCarousel';
import CategoryCarousel from '../components/CategoryCarousel';

const InfluencerScreen = ({ navigation, route }) => {
  const [premiumCarouselItems, setPremiumCarouselItems] = React.useState([
    {
      source: 'https://katherinecalnan.com/wp-content/uploads/sb-instagram-feed-images/124804777_189531592673432_746234738064300489_nlow.jpg',
      name: 'Maria Rssds sdsds',
      category: 'Fashion Model',
    },
    {
      source: 'https://starngage.com/wp-content/uploads/2019/05/1.-Magdalena.jpg',
      name: 'Sasa',
      category: 'Food Blogger',
    },
    {
      source: 'https://www.onblastblog.com/wp-content/uploads/2017/08/how-to-become-a-lifestyle-blogger.jpg',
      name: 'Twins',
      category: 'Lifestyle Content Creator',
    },
    {
      source: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      name: 'Adelle',
      category: 'Make Up Model',
    },
  ]);

  const [categoryCarousel, setCategoryCarousel] = React.useState([
    {
      title: 'Model',
      items: [
        {
          source: 'https://katherinecalnan.com/wp-content/uploads/sb-instagram-feed-images/124804777_189531592673432_746234738064300489_nlow.jpg',
          name: 'Maria Rssds sdsds',
          category: 'Fashion Model',
          province: 'DKI Jakarta',
          city: 'Jakarta'
        },
        {
          source: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
          name: 'Adelle',
          category: 'Make Up Model',
          province: 'DI Jogjakarta',
          city: 'Jogjakarta'
        },
      ],
    },
    {
      title: 'Blogger',
      items: [
        {
          source: 'https://starngage.com/wp-content/uploads/2019/05/1.-Magdalena.jpg',
          name: 'Sasa',
          category: 'Food Blogger',
          province: 'DI Jogjakarta',
          city: 'Jogjakarta'
        },
        {
          source: 'https://images.pexels.com/photos/6469/red-hands-woman-creative.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          name: 'SCURD',
          category: 'Comedy Blogger',
          province: 'Sumatera Utara',
          city: 'Medan'
        },
      ],
    }
  ]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <TopSearchBar />
        <PremiumCarousel 
          containerStyle={styles.premiumCarousel}
          carouselItems={premiumCarouselItems} />
        { categoryCarousel.map((category, index) => {
            return <CategoryCarousel 
              key={index}
              containerStyle={styles.categoryCarousel}
              carouselItems={category}
              navigation={navigation} />
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