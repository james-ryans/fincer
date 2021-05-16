import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MusicList = (props) => {
  const { items, addToQueue } = props;
  
  return (
    <View style={styles.container}>
      <Text style={styles.songTitle}>Songs</Text>
      { items?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}>
              <View style={styles.musicBar}>
                <View style={styles.musicText}>
                  <Text style={styles.musicTitle}>{ item.title }</Text>
                  <Text style={styles.musicArtist}>{ item.artist }</Text>
                </View>
                <Icon style={styles.musicIcon} name='queue-music' size={36} 
                  onPress={() => addToQueue(item) }/>
              </View>
            </TouchableWithoutFeedback>
          );
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  songTitle: {
    paddingHorizontal: 24,
    fontSize: 28,
    fontWeight: 'bold',
  },
  musicBar: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  musicText: {
    flexDirection: 'column',
  },
  musicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  musicArtist: {
  },
  musicIcon: {
    alignSelf: 'center',
  },
});

export default MusicList;