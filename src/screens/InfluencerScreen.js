import * as React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PremiumCarousel from '../components/PremiumCarousel';

import TopSearchBar from '../components/TopSearchBar';

const InfluencerScreen = ({ navigation, route }) => {
  const [premiumCarouselItems, setPremiumCarouselItems] = React.useState([
    {
      source : 'https://katherinecalnan.com/wp-content/uploads/sb-instagram-feed-images/124804777_189531592673432_746234738064300489_nlow.jpg',
      name: 'Maria Rssds sdsds',
      category: 'Model',
    },
    {
      source : 'https://starngage.com/wp-content/uploads/2019/05/1.-Magdalena.jpg',
      name: 'Sasa',
      category: 'Blogger',
    },
    {
      source : 'https://www.onblastblog.com/wp-content/uploads/2017/08/how-to-become-a-lifestyle-blogger.jpg',
      name: 'Twins',
      category: 'Content Creator',
    },
    {
      source : 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      name: 'Adelle',
      category: 'Model',
    }
  ])

  return (
    <View style={styles.container}>
      <TopSearchBar />
      <PremiumCarousel 
        containerStyle={styles.premiumCarousel}
        carouselItems={premiumCarouselItems} />
    </View>
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
    marginVertical: 20,
  },
});