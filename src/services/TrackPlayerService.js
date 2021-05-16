import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

const TrackPlayerSetup = async () => {
  await TrackPlayer.setupPlayer();

  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP,
      TrackPlayer.CAPABILITY_SEEK_TO,
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP,
      TrackPlayer.CAPABILITY_SEEK_TO,
    ],
  });

  const trackQueue = await AsyncStorage.getItem('track_player_queue');
  const trackId = await AsyncStorage.getItem('track_player_id');
  const trackPosition = await AsyncStorage.getItem('track_player_position');
  await TrackPlayer.add(JSON.parse(trackQueue ?? []));
  await TrackPlayer.skip(trackId);
  await TrackPlayer.seekTo(JSON.parse(trackPosition ?? 0));
};
const TrackPlayerSetdown = async() => {
  const trackQueue = await TrackPlayer.getQueue();
  const trackId = await TrackPlayer.getCurrentTrack();
  const trackPosition = await TrackPlayer.getPosition();
  await AsyncStorage.setItem('track_player_queue', JSON.stringify(trackQueue));
  await AsyncStorage.setItem('track_player_id', trackId);
  await AsyncStorage.setItem('track_player_position', JSON.stringify(trackPosition));

  await TrackPlayer.reset();
  await TrackPlayer.stop();
};

const togglePlayback = async (playbackState) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack !== null) {
    if (playbackState === TrackPlayer.STATE_PAUSED 
        || playbackState === TrackPlayer.STATE_NONE) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};
const skipToNext = async () => {
  await TrackPlayer.skipToNext();
};
const skipToPrevious = async () => {
  await TrackPlayer.skipToPrevious();
};
const addToQueue = async (music) => {
  await TrackPlayer.add(music);
  await TrackPlayer.play();
};

export default TrackPlayerSetup;
export { TrackPlayerSetdown, togglePlayback, skipToNext, skipToPrevious, addToQueue };