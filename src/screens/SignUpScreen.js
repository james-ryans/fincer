import * as React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const SignUpScreen = ({ navigation, route }) => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const influencerSignUp = () => {
    navigation.goBack();
  };

  const businessmanSignUp = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.form}>
      <View style={styles.titlePos}>
        <Text style={styles.title}>Fincer</Text>
        <Text style={styles.titleDesc}>finding influencer</Text>
      </View>

      <TextInput
        style={styles.textInput}
        placeholder='E-mail'
        placeholderTextColor='white'
        onChangeText={email => setEmail(email)}/>

      <TextInput
        style={styles.textInput}
        placeholder='Username'
        placeholderTextColor='white'
        onChangeText={username => setUsername(username)}/>

      <TextInput
        style={styles.textInput}
        placeholder='Kata Sandi'
        placeholderTextColor='white'
        onChangeText={password => setPassword(password)}/>

      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => influencerSignUp()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>DAFTAR SEBAGAI INFLUENCER</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => businessmanSignUp()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>DAFTAR SEBAGAI PEBISNIS</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUpScreen;

const styles = StyleSheet.create({
  form: {
    flex: 2,
    backgroundColor: '#4E598C',
    padding: 40,
  },
  titlePos: {
    marginVertical: 50,
    alignSelf: 'center',
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
  buttonView: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#FFFFFF',
    width: windowWidth / 2.8,
    padding: 12,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    textAlign: 'center',
  },
});