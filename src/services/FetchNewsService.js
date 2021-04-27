import { ToastAndroid } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import NewsModel from '../models/NewsModel';

const FetchNewYorkTimesService = (setData) => {
  fetch('https://api.nytimes.com/svc/topstories/v2/fashion.json?api-key=SGIrrwebH4QGgqXd8k8M94iAmGMylWGB')
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      setData(res.results.map((item) => {
        return new NewsModel(item.title, item.abstract, item.url, item.byline, item.multimedia[0].url);
      }));
    })
    .catch((error) => {
      console.warn(error);
    });
};

export { FetchNewYorkTimesService };