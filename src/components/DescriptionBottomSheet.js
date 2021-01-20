import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, Button, TouchableHighlight, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

const DescriptionBottomSheet = (props) => {
  const { data, children, snapPoints } = props;

  return (
    <BottomSheet
      snapPoints={snapPoints}
      index={0}>
      <BottomSheetScrollView
        contentContainerStyle={styles.sheetContainer}>
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default DescriptionBottomSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
})