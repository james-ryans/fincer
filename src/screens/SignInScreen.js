import * as React from 'react';
import { StyleSheet, Text, Button, View, Image, Pressable } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';

import AuthContext from '../utils/authContext';

import HomeScreen from './InfluencerScreen';

const SignInScreen = ({ navigation, route }) => {
  const { isSignedIn, setIsSignedIn } = React.useContext(AuthContext);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string()
          .min(8, 'Must be 8 characters or more')
          .required('Required'),
      })}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        setIsSignedIn(true);
      }}>
      {formik => (
        <View style={styles.container}>
          <Image source={require('../assets/images/sign_in_image.png')} style={styles.background} />
    
          <View style={styles.form}>
            <Text style={styles.title}>Fincer</Text>
            <Text style={styles.titleDesc}>finding influencer</Text>
    
            <TextInput
              style={styles.textInput}
              placeholder='E-mail'
              placeholderTextColor='white'
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}/>
            { formik.touched.email && formik.errors.email &&
              <Text style={styles.errorText}>{ formik.errors.email }</Text>
            }
            
            <TextInput
              style={styles.textInput}
              placeholder='Kata Sandi'
              placeholderTextColor='white'
              secureTextEntry
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}/>
            { formik.touched.password && formik.errors.password &&
              <Text style={styles.errorText}>{ formik.errors.password }</Text>
            }
    
            <View style={styles.centeredText}>
              <Text style={styles.whiteText}>tidak memiliki akun? </Text>
              <Pressable
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.orangeText}>ayo daftar</Text>
              </Pressable>
            </View>
    
            <TouchableOpacity
              onPress={formik.handleSubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>MASUK</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
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
  errorText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#EA3C53',
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