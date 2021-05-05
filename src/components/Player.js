import React, { useState } from "react";
import TrackPlayer, { useTrackPlayerProgress, usePlaybackState, useTrackPlayerEvents, STATE_PLAYING } from "react-native-track-player";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProgressBar = () => {
  const progress = useTrackPlayerProgress();

  return (
    <View style={styles.progress}>
      <View style={{ flex: progress.position, backgroundColor: "red" }} />
      <View
        style={{
          flex: progress.duration - progress.position,
          backgroundColor: "grey"
        }}
      />
    </View>
  );
};

const Player = (props) => {
  const { style, onNext, onPrevious, onTogglePlayback } = props;

  const playbackState = usePlaybackState();
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [middleButtonText, setMiddleButtonText] = useState("");
  useTrackPlayerEvents(['playback-track-changed', 'playback-state'], async (event) => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED
        || event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_STATE) {
      const trackId = await TrackPlayer.getCurrentTrack();
      const track = await TrackPlayer.getTrack(trackId);
      const { title, artist } = track || {};
      setTrackTitle(title);
      setTrackArtist(artist);
    }
  });

  React.useEffect(() => {
    setMiddleButtonText(
      playbackState === TrackPlayer.STATE_PLAYING || playbackState === TrackPlayer.STATE_BUFFERING
      ? 'Pause'
      : 'Play'
    );
  }, [playbackState]);

  return (
    <View style={[styles.card, style]}>
      <Text style={styles.state}>
        { playbackState === TrackPlayer.STATE_PLAYING 
          || playbackState === TrackPlayer.STATE_BUFFERING
          ? 'Now Playing'
          : ''
        }
      </Text>
      <Text style={styles.title}>{trackTitle}</Text>
      <Text style={styles.artist}>{trackArtist}</Text>
      <ProgressBar />
      <View style={styles.controls}>
        <Icon name='skip-previous' size={36} onPress={onPrevious}/>
        <Icon name='play-arrow' size={36} onPress={() => onTogglePlayback(playbackState)}/>
        <Icon name='skip-next' size={36} onPress={onNext}/>
      </View>
    </View>
  );
}

export default Player;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
  },
  state: {
    fontSize: 20,
  },
  progress: {
    height: 1,
    width: "90%",
    marginTop: 10,
    flexDirection: "row"
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold"
  },
  artist: {
  },
  controls: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
});