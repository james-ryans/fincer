import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const BannerList = (props) => {
  const { title, items, onPressHandler } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ title }</Text>
      <View style={styles.listContainer}>
        { items.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => { onPressHandler(item.text); }}>
                <View key={index} style={{...styles.banner, backgroundColor: item.backgroundColor }}>
                  <Text style={styles.bannerText}>{ item.text }</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })
        }
      </View>
    </View>
  );
};

export default BannerList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  title: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  banner: {
    width: (SCREEN_WIDTH - 72) / 2,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  bannerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});