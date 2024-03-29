import * as React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const windowWidth = Dimensions.get('window').width;

const PremiumCarousel = (props) => {
  const { navigation, navigateTo } = props;

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [carouselItems, setCarouselItems] = React.useState(props.carouselItems);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => { navigation.navigate(navigateTo, {
          data: item,
        }) }}>
        <View style={styles.card}>
          <Image
            style={styles.cardImage}
            source={{ uri: item?.imageURI }} />
          <View style={styles.cardText}>
            <Text
              style={styles.cardTitle}
              numberOfLines={2}>
              { item?.name }
            </Text>
            <Text style={styles.cardDesc}>{ item?.subcategory }</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View
      style={props.containerStyle}>
      <Text style={styles.title}>Premium</Text>
      <Carousel 
        layout="default"
        data={carouselItems}
        sliderWidth={windowWidth}
        itemWidth={230}
        renderItem={renderItem}
        activeSlideAlignment="start"
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        contentContainerCustomStyle={styles.contentContainer}
        onSnapToItem={(index) => { setActiveIndex(index) }} />
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.dotContainer}
          inactiveDotOpacity={0.15}
          inactiveDotScale={0.8} />
    </View>
  );
};

export default PremiumCarousel;

const styles = StyleSheet.create({
  contentContainer: {
    marginLeft: 8,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    marginBottom: 6,
    marginLeft: 32,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    height: 100,
    marginLeft: 24,
  },
  cardImage: {
    borderRadius: 12,
    height: 100,
    width: 80,
  },
  cardText: {
    padding: 18,
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: 12,
    color: '#727272',
  },
  paginationContainer: {
    alignSelf: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 0,
    marginLeft: 32,
  },
  dotContainer: {
    marginLeft: 0,
  },
});