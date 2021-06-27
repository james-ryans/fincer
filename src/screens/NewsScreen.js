import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {AdMobInterstitial} from 'react-native-admob';
import BackgroundTimer from 'react-native-background-timer';
import {FetchNewYorkTimesService} from '../services/FetchNewsService';
import NewsList from '../components/NewsList';

const NewsScreen = (props) => {
  const [news, setNews] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPremium, setIsPremium] = React.useState();

  const userId = auth().currentUser.uid;
  const [userType, setUserType] = React.useState();

  React.useEffect(() => {
    database()
      .ref('/users/influencers')
      .once('value', (snapshot) => {
        const type = snapshot.hasChild(userId) ? 'influencers' : 'brands';
        setUserType(type);
      });
  }, [userId]);

  React.useEffect(() => {
    if (userType) {
      database()
        .ref(`/premiums/${userType}/${userId}`)
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            setIsPremium(true);
          } else {
            setIsPremium(false);
          }
        });
    }
  }, [userId, userType]);

  React.useEffect(() => {
    FetchNewYorkTimesService(setNews);
    BackgroundTimer.setInterval(() => {
      FetchNewYorkTimesService(setNews);
    }, 15 * 60 * 1000); // 15 minutes interval
  }, []);

  React.useEffect(() => {
    if (isPremium !== undefined) {
      setIsLoading(false);

      if (!isPremium) {
        AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
      }
    }
  }, [isPremium]);

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <NewsList ads={!isPremium} items={news} />
      </ScrollView>
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
});
