import * as React from 'react';
import { Linking } from 'react-native';
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Image from 'react-native-scalable-image';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const ImageList = (props) => {
  const { items } = props;

  return (
    <View style={styles.container}>
      { items?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}>
              <View style={styles.card}>
                <Image
                  width={(SCREEN_WIDTH - 72) / 2}
                  style={styles.cardImage}
                  progressiveRenderingEnabled={true}
                  source={{ uri: item }} />
              </View>
            </TouchableWithoutFeedback>
          );
        })
      }
    </View>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: (SCREEN_WIDTH - 72) / 2,
    marginTop: 24,
    borderRadius: 12,
  },
  cardImage: {
    borderRadius: 12,
  },
});