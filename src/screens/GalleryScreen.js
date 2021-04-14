import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView, PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import ImageList from '../components/ImageList';
import * as _ from 'lodash';
import { ToastAndroid } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const GalleryScreen = (props) => {
  const [images, setImages] = React.useState();

  const fetchImages = async () => {
    ToastAndroid.show('Fetch Picture!', ToastAndroid.SHORT);
    let pictureDir = RNFetchBlob.fs.dirs.PictureDir;
    let DCIMDir = RNFetchBlob.fs.dirs.DCIMDir + '/Camera';
    let data = [];

    await RNFetchBlob.fs.ls(DCIMDir)
    .then((items) => {
      let result = items.map((item) => {
        return 'file://' + DCIMDir + '/' + item;
      });

      data = [
        ...data, 
        ...result,
      ];
    });

    await RNFetchBlob.fs.ls(pictureDir)
      .then((items) => {
        let result = items.map((item) => {
          return 'file://' + pictureDir + '/' + item;
        });

        data = [
          ...data, 
          ...result,
        ];
      });

    if (!_.isEqual(data, images)) {
      setImages(data);
    }
  };

  // React.useEffect(() => {
  //   fetchImages();
  //   let intervalId = setInterval(fetchImages, 5000);
  //   return () => clearInterval(intervalId);
  // }, []);

  React.useEffect(() => {
    fetchImages();
    BackgroundTimer.setInterval(() => {
      fetchImages();
    }, 5 * 1000); // 5 secs interval
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <ImageList
          items={images}/>
      </ScrollView>
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
})