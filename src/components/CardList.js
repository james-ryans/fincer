import * as React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const CardList = (props) => {
  const { navigation, navigateTo, title, items } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ title }</Text>
      <View style={styles.listContainer}>
        { items.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => { navigation.navigate(navigateTo, {
                  data: item,
                }); }}>
                <View key={index} style={styles.card}>
                  <Image
                    style={styles.cardImage}
                    source={{ uri: item.source }} />
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{ item.name } </Text>
                    <Text style={styles.cardSubcategory}>{ item.subcategory }</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          })
        }
      </View>
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
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
  card: {
    backgroundColor: '#F2F2F2',
    width: (SCREEN_WIDTH - 72) / 2,
    height: 5 / 4 * (SCREEN_WIDTH - 72) / 2 + 60,
    marginBottom: 24,
    borderRadius: 12,
  },
  cardImage: {
    width: (SCREEN_WIDTH - 72) / 2,
    height: 5 / 4 * (SCREEN_WIDTH - 72) / 2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardText: {
    padding: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubcategory: {
    fontSize: 13,
    color: '#626262',
  },
});