import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { FetchNewYorkTimesService } from '../services/FetchNewsService';
import NewsList from '../components/NewsList';

const NewsScreen = (props) => {
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    FetchNewYorkTimesService(setNews);
    BackgroundTimer.setInterval(() => {
      FetchNewYorkTimesService(setNews);
    }, 15 * 60 * 1000); // 15 minutes interval
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <NewsList
          items={news}
        />
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
})