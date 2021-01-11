import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, TouchableWithoutFeedback, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const InfluencerDetailScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.imageBackground}
        source={{ uri: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' }}>
        <TouchableWithoutFeedback
          onPress={() => { navigation.navigate('Influencer') }}>
          <Icon style={styles.backIcon} name='arrow-left' size={32} />
        </TouchableWithoutFeedback>

        <View style={styles.swipeableContainer}>
          <View style={styles.swipeable}>
            <TouchableWithoutFeedback>
              <View style={styles.swipeableButton}></View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.descContainer}>
            <View style={styles.leftDesc}>
              <Text style={styles.boldText}>Adelle</Text>
              <View style={styles.flexEnd}>
                <Text style={styles.normalText}>Fashion Model</Text>
                <Text style={styles.thinText}>DKI Jakarta, Jakarta</Text>
              </View>
            </View>
            <View style={styles.rightDesc}>
              <Text style={styles.boldText}>Price</Text>
              <Text style={styles.normalText}>~ Rp. 350.000</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default InfluencerDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  backIcon: {
    margin: 16,
    color: '#FFFFFF',
  },
  swipeableContainer: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: 124,
    backgroundColor: '#FFFFFF',
    borderTopColor: '#F2F2F2',
  },
  swipeable: {
    paddingTop: 8,
    width: '100%',
    alignItems: 'center',
  },
  swipeableButton: {
    height: 6,
    width: 80,
    backgroundColor: '#E2E2E2',
    borderRadius: 4,
  },
  descContainer: {
    paddingTop: 14,
    paddingHorizontal: 24,
    flex: 1,
    flexDirection: 'row',
  },
  leftDesc: {
    flex: 1,
    height: 76,
  },
  rightDesc: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: 76,
  },
  boldText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  flexEnd: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  normalText: {
    fontSize: 14,
    color: '#727272',
  },
  thinText: {
    fontSize: 12,
    color: '#A2A2A2',
  }
})