import * as React from 'react';
import { StyleSheet, View, Text,
Dimensions, Button, TouchableHighlight,
TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';
import DescriptionBottomSheet from '../components/DescriptionBottomSheet';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

const BrandDetailScreen = (props) => {
  const { navigation, route } = props;
  const { data } = route.params;

  return (
    <View style={styles.container}>
        <ImageBackground
            style={styles.imageBackground}
            source={{ uri: data.source }}>
            <TouchableWithoutFeedback
                onPress={() => { navigation.navigate('Brand')
            }}>
            <Icon style={styles.backIcon} name='arrow-left' size={32} />
            </TouchableWithoutFeedback>
        </ImageBackground>

        <DescriptionBottomSheet
            data={data}
        />
    </View>
  );
};

export default BrandDetailScreen;

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
        textShadowOffset: {width: 0, height:0},
        textShadowColor: '#A2A2A2',
        textShadowRadius: 16,
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
});