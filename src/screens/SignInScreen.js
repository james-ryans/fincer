import * as React from 'react';
import { StyleSheet, Text, Button, View, Image, Pressable } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AuthContext from '../utils/authContext';

import HomeScreen from './HomeScreen';

const SignInScreen = ({ navigation, route }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { isSignedIn, setIsSignedIn } = React.useContext(AuthContext);

  const validateSignIn = () => {
    setIsSignedIn(true);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/sign_in_image.png')} style={styles.background} />

      <View style={styles.form}>
        <Text style={styles.title}>Fincer</Text>
        <Text style={styles.titleDesc}>finding influencer</Text>

        <TextInput
          style={styles.textInput}
          placeholder='E-mail atau Username'
          placeholderTextColor='white'
          onChangeText={username => setUsername(username)}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Kata Sandi'
          placeholderTextColor='white'
          onChangeText={password => setPassword(password)}
          secureTextEntry
        />

        <View style={styles.centeredText}>
          <Text style={styles.whiteText}>tidak memiliki akun? </Text>
          <Pressable
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.orangeText}>ayo daftar</Text>
          </Pressable>
        </View>

        <TouchableOpacity
          onPress={() => validateSignIn()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>MASUK</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1.2,
    width: '100%',
  },
  form: {
    flex: 2,
    backgroundColor: '#4E598C',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 40,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 40,
    color: '#FFFFFF',
  },
  titleDesc: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#FCAF58',
  },
  textInput: {
    fontFamily: 'Montserrat-Regular',
    backgroundColor: '#6B78AE',
    color: 'white',
    marginTop: 30,
    borderRadius: 15,
    padding: 10,
  },
  centeredText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  whiteText: {
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
  orangeText: {
    fontFamily: 'Montserrat-Regular',
    color: '#FF8C42',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    width: 207,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  }
});