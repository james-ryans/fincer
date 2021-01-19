import * as React from 'react';
import { StyleSheet, Dimensions, ImageBackground, View, Text, Button, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DescriptionBottomSheet from '../components/DescriptionBottomSheet';
import { TouchableOpacityComponent } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

const ProfileScreen = (props) => {
  const { navigation } = props;

  const userId = auth().currentUser.uid;
  const influencerRef = database().ref(`influencers/${userId}`);
  const [influencer, setInfluencer] = React.useState(showInfluencer);

  const authLogout = () => {
    auth().signOut();
  };

  const showInfluencer = () => {
    influencerRef.once('value', (snapshot) => {
      setInfluencer(snapshot.val());
    });
  };

  const updateInfluencer = (newData) => {
    influencerRef.set(newData);
    showInfluencer();
  };

  const destroyInfluencer = () => {
    influencerRef.remove();
    showInfluencer();
  }

  return (
    <View style={styles.container}>
      <Icon style={styles.noImage} name='no-photography' size={48} />

      <DescriptionBottomSheet
        snapPoints={[128]}>
        <TouchableOpacity
          style={styles.createButton}
          activeOpacity={0.8}
          underlayColor='#DF6D4F'
          onPress={() => { navigation.navigate('ProfileUpdate'); }}>
          <Text style={styles.buttonText}>Buat Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          underlayColor='#DF0000'
          onPress={authLogout}>
          <Text style={styles.buttonText}>Keluar</Text>
        </TouchableOpacity>
      </DescriptionBottomSheet>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2',
    alignItems: 'center',
  },
  noImage: {
    marginTop: (SCREEN_HEIGHT - 94 - 128 - 48) / 2,
    color: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowColor: '#A2A2A2',
    textShadowRadius: 16,
  },
  createButton: {
    marginTop: 15,
    backgroundColor: '#FF8D6F',
    width: 144,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 15,
  },
  logoutButton: {
    marginTop: 15,
    backgroundColor: '#FF0000',
    width: 144,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: 'white',
  }
});