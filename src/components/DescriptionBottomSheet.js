import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, Button, TouchableHighlight, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

const DescriptionBottomSheet = (props) => {
  const { data } = props;

  return (
    <BottomSheet
      snapPoints={[100, SCREEN_HEIGHT - 132]}
      index={0}>
      <BottomSheetScrollView
        contentContainerStyle={styles.sheetContainer}>
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
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default DescriptionBottomSheet;

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
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
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