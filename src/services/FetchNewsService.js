import { ToastAndroid } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const FetchNewYorkTimesService = async () => {
  try {
    const result = await fetch('https://api.nytimes.com/svc/topstories/v2/fashion.json?api-key=SGIrrwebH4QGgqXd8k8M94iAmGMylWGB');
    const data = await result.json();
    return data;
  } catch (error) {
    return null;
  }
};

export { FetchNewYorkTimesService };