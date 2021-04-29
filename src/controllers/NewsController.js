import * as React from 'react';
import BackgroundTimer from 'react-native-background-timer';
import { FetchNewYorkTimesService } from '../services/FetchNewsService';
import NewsScreen from '../screens/NewsScreen';
import NewsModel from '../models/NewsModel';

const NewsController = (props) => {
  const [news, setNews] = React.useState([]);

  const fetchNewYorkTimesAPI = () => {
    FetchNewYorkTimesService().then((res) => {
      setNews(res.results.map((item) => {
        return new NewsModel(item.title, item.abstract, item.url, item.byline, item.multimedia[0].url);
      }));
    });
  }

  React.useEffect(() => {
    fetchNewYorkTimesAPI();
    BackgroundTimer.setInterval(() => {
      fetchNewYorkTimesAPI();
    }, 15 * 60 * 1000); // 15 minutes interval
  }, []);

  return <NewsScreen news={news} />
}

export default NewsController;