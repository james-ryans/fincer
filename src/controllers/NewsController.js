import * as React from 'react';
import BackgroundTimer from 'react-native-background-timer';
import { FetchNewYorkTimesService } from '../services/FetchNewsService';
import NewsScreen from '../screens/NewsScreen';

const NewsController = (props) => {
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    FetchNewYorkTimesService(setNews);
    BackgroundTimer.setInterval(() => {
      FetchNewYorkTimesService(setNews);
    }, 15 * 60 * 1000); // 15 minutes interval
  }, []);

  return <NewsScreen news={news} />
}

export default NewsController;