import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView, PermissionsAndroid } from 'react-native';
import FetchMusicList from '../services/FetchMusicList';
import TrackPlayer from 'react-native-track-player';
import TrackPlayerSetup, { togglePlayback, skipToNext, skipToPrevious, addToQueue } from '../services/TrackPlayerService';
import MusicList from '../components/MusicList';
import Player from '../components/Player';
import { Button } from 'react-native';

const MusicScreen = (props) => {
  const [musicList, setMusicList] = React.useState([]);

  React.useEffect(() => {
    FetchMusicList().then((res) => {
      setMusicList(res);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <Player
          onNext={skipToNext}
          style={styles.player}
          onPrevious={skipToPrevious}
          onTogglePlayback={togglePlayback} />
        <MusicList 
          items={musicList}
          addToQueue={addToQueue} />
      </ScrollView>
    </View>
  );
};

export default MusicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flex: 1,
  },
  player: {
    marginTop: 40
  },
})