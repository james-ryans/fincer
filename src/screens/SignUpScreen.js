import * as React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const windowWidth = Dimensions.get('window').width;

const SignUpScreen = ({ navigation, route }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        buttonState: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string()
          .min(6, 'Must be at least 6 characters long')
          .required('Required'),
        confirmPassword: Yup.string()
        .min(6, 'Must be at least 6 characters long')
        .required('Required')
        .oneOf([Yup.ref('password')], 'Please make sure your password match'),
      })}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then(() => {
            database()
              .ref(`/users/${values.buttonState}`)
              .set({ [auth().currentUser.uid]: true });
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              actions.setFieldError('email', 'That email address is already exists');
            }
          });
      }}
    >
      { formik => (
        <View style={styles.form}>
          <View style={styles.titlePos}>
            <Text style={styles.title}>Fincer</Text>
            <Text style={styles.titleDesc}>finding influencer</Text>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder='E-mail'
            placeholderTextColor='#222832'
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}/>
          { formik.touched.email && formik.errors.email &&
            <Text style={styles.errorText}>{ formik.errors.email }</Text>
          }

          <TextInput
            style={styles.textInput}
            placeholder='Kata Sandi'
            placeholderTextColor='#222832'
            secureTextEntry
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}/>
          { formik.touched.password && formik.errors.password &&
            <Text style={styles.errorText}>{ formik.errors.password }</Text>
          }

          <TextInput
            style={styles.textInput}
            placeholder='Konfirmasi Kata Sandi'
            placeholderTextColor='#222832'
            secureTextEntry
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}/>
          { formik.touched.confirmPassword && formik.errors.confirmPassword &&
            <Text style={styles.errorText}>{ formik.errors.confirmPassword }</Text>
          }

          <View style={styles.buttonView}>
          <TouchableOpacity
              onPress={() => {
                formik.setFieldValue('buttonState', 'influencers');
                formik.handleSubmit();
              }}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>DAFTAR SEBAGAI INFLUENCER</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                formik.setFieldValue('buttonState', 'brands');
                formik.handleSubmit();
              }}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>DAFTAR SEBAGAI PEBISNIS</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  )
}

export default SignUpScreen;

const styles = StyleSheet.create({
  form: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    padding: 40,
  },
  titlePos: {
    marginVertical: 50,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 40,
    color: '#222832',
  },
  titleDesc: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#FFAB8D',
  },
  errorText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#EA3C53',
  },
  textInput: {
    fontFamily: 'Montserrat-Regular',
    backgroundColor: '#F2F2F2',
    color: '#222832',
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
    backgroundColor: '#FFAB8D',
    width: windowWidth / 2.8,
    padding: 12,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
});