import * as React from 'react';
import { StyleSheet, Dimensions, ImageBackground, View, Text, Button, Modal, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DescriptionBottomSheet from '../components/DescriptionBottomSheet';
import { TouchableOpacityComponent } from 'react-native';
import { rgb } from 'chalk';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');

const ProfileScreen = (props) => {
  const { navigation, route } = props;

  const [isLoading, setIsLoading] = React.useState(true);

  const userId = auth().currentUser.uid;
  const [userType, setUserType] = React.useState();
  const [userRef, setUserRef] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    (async () => {
      database()
        .ref('/users/influencers')
        .once('value', (snapshot) => {
          setUserType(snapshot.hasChild(userId) ? 'influencers' : 'brands');
        });
    })();
  }, []);

  React.useEffect(() => {
    const ref = database()
      .ref(`/${userType}/${userId}`);

    setUserRef(ref);

    ref.on('value', (snapshot) => {
      setUser(snapshot.val());
    });
  }, [userId, userType]);

  React.useEffect(() => {
    setIsLoading(user === undefined);
  }, [user]);

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      { !user ? (
          <EmptyProfile
            navigation={navigation}
            userType={userType} />
        ) : (
          <ExistProfile
            navigation={navigation}
            setIsLoading={setIsLoading}
            userRef={userRef}
            userType={userType}
            user={user} />
        )
      }
    </View>
  );
};

const EmptyProfile = (props) => {
  const { navigation, userType } = props;

  return (
    <>
      <Icon style={styles.noImage} name='no-photography' size={48} />

      <DescriptionBottomSheet
        snapPoints={[128]}>
        <TouchableOpacity
          style={styles.createButton}
          activeOpacity={0.8}
          underlayColor='#DF6D4F'
          onPress={() => { navigation.navigate('ProfileUpdate', {
            userType: userType,
          }); }}>
          <Text style={styles.buttonText}>Buat Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          underlayColor='#DF0000'
          onPress={() => { auth().signOut(); }}>
          <Text style={styles.buttonText}>Keluar</Text>
        </TouchableOpacity>
      </DescriptionBottomSheet>
    </>
  )
};

const ExistProfile = (props) => {
  const { navigation, setIsLoading, userRef, user, userType } = props;

  const [removeModalVisible, setRemoveModalVisible] = React.useState(false);

  return (
    <ImageBackground
    style={styles.imageBackground}
    source={{ uri : user.imageURI }}>
      <ProfileModal 
        name={user.name}
        userRef={userRef}
        removeModalVisible={removeModalVisible}
        setRemoveModalVisible={setRemoveModalVisible}
      />

      <DescriptionBottomSheet
        snapPoints={[88, SCREEN_HEIGHT - 198]}>
        <View></View>
        <View style={styles.topDesc}>
          <View style={styles.leftDesc}>
            <Text style={styles.boldText} numberOfLines={1}>{ user.name }</Text>
            <View style={styles.flexEnd}>
              <Text style={styles.normalText}>{ user.subcategory }</Text>
              <Text style={styles.thinText}>{ user.province }, { user.city }</Text>
            </View>
          </View>
          <View style={styles.rightDesc}>
            <Text style={styles.boldText}>Price</Text>
            <Text style={styles.normalText}>~ Rp. { user.price }</Text>
          </View>
        </View>
        <Text style={styles.descText}>Description</Text>
        <Text style={styles.desc}>{ user.description }</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.createButton}
            activeOpacity={0.8}
            underlayColor='#DF6D4F'
            onPress={() => { navigation.navigate('ProfileUpdate', {
              userType: userType,
              user: user,
            }); }}>
            <Text style={styles.buttonText}>Update Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            activeOpacity={0.8}
            underlayColor='#DF0000'
            onPress={() => { setRemoveModalVisible(true); }}>
            <Text style={styles.removeButtonText}>Hapus Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            underlayColor='#F2F2F2'
            onPress={() => { auth().signOut(); }}>
            <Text style={styles.buttonText}>Keluar</Text>
          </TouchableOpacity>
        </View>
      </DescriptionBottomSheet>
    </ImageBackground>
  );
};

const ProfileModal = (props) => {
  const { name, userRef, removeModalVisible, setRemoveModalVisible } = props;

  return (
    <Modal
        animationType='fade'
        transparent={true}
        visible={removeModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.boldModalText}>Apakah anda yakin ingin menghapus profil bernama {name}?</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelModalButton}
                onPress={() => { setRemoveModalVisible(false); }}>
                <Text style={styles.removeButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptModalButton}
                onPress={() => {
                  setIsLoading(true);
                  userRef.remove();
                  setRemoveModalVisible(false);
                }}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  );
}

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
  imageBackground: {
    width: '100%',
    flex: 1,
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
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  createButton: {
    marginTop: 15,
    backgroundColor: '#FF8D6F',
    width: 200,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 15,
  },
  logoutButton: {
    marginTop: 15,
    backgroundColor: '#FF0000',
    width: 200,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 15,
  },
  removeButton: {
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    width: 198,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'red',
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  removeButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: 'black',
  },
  acceptModalButton: {
    backgroundColor: '#FF8D6F',
    width: 70,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
    marginLeft: 16,
  },
  cancelModalButton: {
    backgroundColor: '#FFFFFF',
    width: 70,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    width: SCREEN_WIDTH * 2 / 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 25,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  boldModalText: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25,
  }
});