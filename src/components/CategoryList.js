import * as React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const CategoryList = (props) => {
  const { categories } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>
        { categories.map((category, index) => {
            return (
              <View key={index} style={{...styles.banner, backgroundColor: category.backgroundColor }}>
                <Text style={styles.bannerText}>{ category.text }</Text>
              </View>
            );
          })
        }
      </View>
    </View>
  );
};

export default CategoryList;

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