import * as React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
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
        username: '',
        password: '',
        buttonState: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        username: Yup.string()
          .min(4, 'Must be at least 4 characters long')
          .required('Required'),
        password: Yup.string()
          .min(8, 'Must be at least 8 characters long')
          .required('Required')
      })}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        navigation.goBack();
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
            placeholderTextColor='white'
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}/>
          { formik.touched.email && formik.errors.email &&
            <Text style={styles.errorText}>{ formik.errors.email }</Text>
          }

          <TextInput
            style={styles.textInput}
            placeholder='Username'
            placeholderTextColor='white'
            onChangeText={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}/>
          { formik.touched.username && formik.errors.username &&
            <Text style={styles.errorText}>{ formik.errors.username }</Text>
          }

          <TextInput
            style={styles.textInput}
            placeholder='Kata Sandi'
            placeholderTextColor='white'
            secureTextEntry
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}/>
          { formik.touched.password && formik.errors.password &&
            <Text style={styles.errorText}>{ formik.errors.password }</Text>
          }

          <View style={styles.buttonView}>
          <TouchableOpacity
              onPress={() => {
                formik.setFieldValue('buttonState', 'INFLUENCER');
                formik.handleSubmit();
              }}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>DAFTAR SEBAGAI INFLUENCER</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                formik.setFieldValue('buttonState', 'BUSINESSMAN');
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