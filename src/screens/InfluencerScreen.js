import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, Button, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import { debounce, throttle } from 'lodash';

import TopSearchBar from '../components/TopSearchBar';
import PremiumCarousel from '../components/PremiumCarousel';
import CategoryCarousel from '../components/CategoryCarousel';

const InfluencerScreen = (props) => {
  const { navigation } = props;

  const [isLoading, setIsLoading] = React.useState(true);
  const [premiumCarouselItems, setPremiumCarouselItems] = React.useState();
  const [categoryCarousel, setCategoryCarousel] = React.useState();

  React.useEffect(() => {
    (async () => {
      database()
        .ref('/premiums/influencers')
        .on('value', (snapshot) => {
          let influencers = [];
          snapshot.forEach((item) => {
            influencers.push(item.val());
          })
          setPremiumCarouselItems(influencers);
        });
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      let influencers = [];
      database()
        .ref('/categories/influencers')
        .once('value', (categorySnapshot) => {
          influencers = [];
          categorySnapshot.forEach((category) => {
            influencers.push({
              title: category.val().name,
              key: category.key,
              items: [],
            });
          });
        })
        .then(() => {
          database()
            .ref('/influencers')
            .on('value', (influencerSnapshot) => {
              influencers = influencers.map((influencer) => {
                influencer.items = [];
                return influencer;
              });

              influencerSnapshot.forEach((snapshot) => {
                influencers = influencers.map((influencer) => {
                  if (influencer.key === snapshot.val().category) {
                    influencer.items.push(snapshot.val());
                  }
                  return influencer;
                });
              });

              setCategoryCarousel(influencers);
            });
        });
    })();
  }, []);

  React.useEffect(() => {
    setIsLoading(!categoryCarousel?.length);
  }, [categoryCarousel]);

  const onFocusHandler = debounce(() => {
    navigation.navigate('InfluencerFilter');
  }, 2000, { leading: true, trailing: false });

  // if (isLoading) {
  //   return null;
  // }

  return (
    <ScrollView>
      <View style={styles.container}>
        <TopSearchBar
          onFocus={onFocusHandler} />
        { premiumCarouselItems?.length > 0 && 
          <PremiumCarousel 
            containerStyle={styles.premiumCarousel}
            carouselItems={premiumCarouselItems}
            navigation={navigation}
            navigateTo="InfluencerDetail" />
        }
        { categoryCarousel?.map((category, index) => {
            if (category.items.length === 0) return null;
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