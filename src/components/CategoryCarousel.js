import * as React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;

const CategoryCarousel = (props) => {
  const { navigation } = props;

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [carouselRef, setCarouselRef] = React.useState(React.createRef());

  const carouselItems = props.carouselItems.items;

  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => { navigation.navigate('InfluencerDetail', {
          data: item,
        }) }}>
        <View style={styles.card}>
          <Image
            style={styles.cardImage}
            source={{ uri: item.source }} />
          <View style={styles.cardText}>
            <Text
              style={styles.cardTitle}
              numberOfLines={1}>
              { item.name }
            </Text>
            <Text style={styles.cardDesc}>{ item.subcategory }</Text>
            <Text style={styles.cardLocation}>{ item.province }, { item.city }</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View
      style={props.containerStyle}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{props.carouselItems.title}</Text>
        <View style={styles.button}>
          <TouchableHighlight
            disabled={activeIndex === 0}
            onPress={() => { carouselRef.snapToPrev(); }}
            style={styles.circleButton}
            underlayColor='#F2F2F2'>
            <Icon name='angle-left' size={24} />
          </TouchableHighlight>
          <TouchableHighlight
            disabled={activeIndex === carouselItems.length - 1}
            onPress={() => { carouselRef.snapToNext() }}
            style={styles.circleButton}
            underlayColor='#F2F2F2'>
            <Icon name='angle-right' size={24} />
          </TouchableHighlight>
        </View>
      </View>
      <Carousel 
        layout="default"
        ref={(ref) => { setCarouselRef(ref); }}
        data={carouselItems}
        sliderWidth={windowWidth}
        itemWidth={windowWidth - 32}
        renderItem={renderItem}
        activeSlideAlignment="start"
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        contentContainerCustomStyle={styles.contentContainer}
        onSnapToItem={(index) => { setActiveIndex(index) }} />
    </View>
  );
};

export default CategoryCarousel;

const styles = StyleSheet.create({
  contentContainer: {
    marginLeft: 32,
  },
  title: {
    marginHorizontal: 32,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
  },
  button: {
    flexDirection: 'row',
  },
  circleButton: {
    marginLeft: 12,
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: '#F2F2F2',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    height: 5 / 4 * (windowWidth - 64) + 100,
    marginRight: 32,
  },
  cardImage: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 5 / 4 * (windowWidth - 64),
    width: '100%',
  },
  cardText: {
    margin: 18,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: 14,
    color: '#727272',
  },
  cardLocation: {
    fontSize: 12,
    color: '#A2A2A2',
  }
});