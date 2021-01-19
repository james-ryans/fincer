import * as React from 'react';
import { StyleSheet, ImageBackground, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import DescriptionBottomSheet from '../components/DescriptionBottomSheet';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

const ProfileUpdateScreen = (props) => {
  const { navigation, route } = props;

  const userId = auth().currentUser.uid;
  const [userType, setUserType] = React.useState();
  const [imageURI, setImageURI] = React.useState();

  React.useEffect(() => {
    database().ref('/users/influencers').once('value', (snapshot) => {
      setUserType(snapshot.hasChild(userId) ? 'influencers' : 'brands');
    });
  }, []);

  const uploadFile = () => {
    ImagePicker.launchImageLibrary({
      noData: true,
    }, (response) => {
      if (!response.didCancel && response.fileSize <= 5 * 1024 * 1024 && response.errorCode == null) {
        const imageType = response.type.split('/').pop();
        setImageURI(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={{ uri : imageURI }}>
        <TouchableWithoutFeedback
          onPress={() => { navigation.navigate('Profile') }}>
          <Icon style={styles.backIcon} name='arrow-left' size={32} />
        </TouchableWithoutFeedback>
        <View style={styles.centerContainer}>
          <TouchableWithoutFeedback
            onPress={uploadFile}>
            <MaterialCommunityIcon style={styles.addImage} name='camera-plus' size ={48} />
          </TouchableWithoutFeedback>
          <Text></Text>
        </View>
      </ImageBackground>

      <DescriptionBottomSheet
        snapPoints={[100, SCREEN_HEIGHT - 132]}>
        <Text>wkwk</Text>
      </DescriptionBottomSheet>
    </View>
  );
};

export default ProfileUpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2',
  },
  centerContainer: {
    flex: 1,
    alignSelf: 'center',
    marginTop: (SCREEN_HEIGHT) / 2 - 100 - 48,
  },
  addImage: {
    alignSelf: 'center',
    color: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowColor: '#A2A2A2',
    textShadowRadius: 16,
  },
  imageBackground: {
    width: '100%',
    flex: 1,
  },
  backIcon: {
    margin: 16,
    color: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowColor: '#A2A2A2',
    textShadowRadius: 16,
  },
});