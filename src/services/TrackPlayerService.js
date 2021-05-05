import TrackPlayer from 'react-native-track-player';
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
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE
    ],
  });
};
const TrackPlayerSetdown = async() => {
  await TrackPlayer.reset();
  await TrackPlayer.stop();
};

const togglePlayback = async (playbackState) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  console.log('current', currentTrack, playbackState);
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
  console.log('music', music);

  await TrackPlayer.add(music);
  await TrackPlayer.play();

  await TrackPlayer.getQueue().then((res) => {
    console.log('queue', res.map(item => item.title));
  });
};

export default TrackPlayerSetup;
export { TrackPlayerSetdown, togglePlayback, skipToNext, skipToPrevious, addToQueue };