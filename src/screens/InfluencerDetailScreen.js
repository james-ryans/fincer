import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, Button, TouchableHighlight, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';
import DescriptionBottomSheet from '../components/DescriptionBottomSheet';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

const InfluencerDetailScreen = (props) => {
  const { navigation, route } = props;
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.imageBackground}
        source={{ uri: data.imageURI }}>
        <TouchableWithoutFeedback
          onPress={() => { navigation.navigate('Influencer') }}>
          <Icon style={styles.backIcon} name='arrow-left' size={32} />
        </TouchableWithoutFeedback>
      </ImageBackground>

      <DescriptionBottomSheet
        snapPoints={[100, SCREEN_HEIGHT - 132]}>
        <View style={styles.topDesc}>
          <View style={styles.leftDesc}>
            <Text style={styles.boldText} numberOfLines={1}>{ data.name }</Text>
            <View style={styles.flexEnd}>
              <Text style={styles.normalText}>{ data.subcategory }</Text>
              <Text style={styles.thinText}>{ data.province }, { data.city }</Text>
            </View>
          </View>
          <View style={styles.rightDesc}>
            <Text style={styles.boldText}>Price</Text>
            <Text style={styles.normalText}>~ Rp. { data.price }</Text>
          </View>
        </View>
        <Text style={styles.descText}>Description</Text>
        <Text style={styles.desc}>{ data.description }</Text>
      </DescriptionBottomSheet>
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
    textShadowOffset: { width: 0, height: 0 },
    textShadowColor: '#A2A2A2',
    textShadowRadius: 16,
  },
  topDesc: {
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
    color: '#000000',
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
  },
  descText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  desc: {
    color: '#525252',
  }
})