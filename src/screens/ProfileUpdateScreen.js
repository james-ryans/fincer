import * as React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Modal,
  Button,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import {ErrorMessage, Formik} from 'formik';
import * as Yup from 'yup';
import DescriptionBottomSheet from '../components/DescriptionBottomSheet';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen');

const ProfileUpdateScreen = (props) => {
  const {navigation, route} = props;

  const [isLoading, setIsLoading] = React.useState(true);

  const userId = auth().currentUser.uid;
  const [userType, setUserType] = React.useState(route.params?.userType);
  const [user, setUser] = React.useState(route.params?.user);

  const [categories, setCategories] = React.useState();

  React.useEffect(() => {
    let isSubscribed = user === undefined;

    if (isSubscribed) {
      database()
        .ref(`/${userType}/${userId}`)
        .once('value', (snapshot) => {
          setUser(snapshot.val());
        });
    }

    return () => {
      isSubscribed = false;
    };
  }, [userType]);

  React.useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      database()
        .ref(`/categories/${userType}`)
        .orderByKey()
        .once('value', (snapshot) => {
          let category_arr = [];
          snapshot.forEach((item) => {
            category_arr.push({
              value: item.key,
              label: item.val().name,
            });
          });
          setCategories(category_arr);
        });
    }

    return () => {
      isSubscribed = false;
    };
  }, [userId, userType]);

  React.useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      setIsLoading(
        user === undefined ||
          categories === undefined ||
          categories.length === 0,
      );
    }
    return () => {
      isSubscribed = false;
    };
  }, [user, categories]);

  if (isLoading) {
    return null;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        imageURI: user?.imageURI,
        name: user?.name,
        category: user?.category ?? categories[0].value,
        subcategory: user?.subcategory,
        city: user?.city,
        province: user?.province,
        price: user?.price,
        description: user?.description,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(4, 'Must be 4 characters or more')
          .required('Required'),
        imageURI: Yup.string().required('Required'),
        category: Yup.string().required('Required'),
        subcategory: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        province: Yup.string().required('Required'),
        price: Yup.number('Price must be a number')
          .moreThan(0, 'Price must greater than 0')
          .required('Required'),
        description: Yup.string().required('Required'),
      })}
      onSubmit={(values, actions) => {
        const imageType = values.imageURI.split('.').pop().split('?').shift();

        const storagePutFile = async () => {
          storage()
            .ref(`/${userType}/${userId}.${imageType}`)
            .putFile(values.imageURI)
            .then(databasePutData);
        };

        const databasePutData = () => {
          storage()
            .ref(`/${userType}/${userId}.${imageType}`)
            .getDownloadURL()
            .then((url) => {
              if (user) {
                database()
                  .ref(
                    `/categories/${userType}/${user.category}/members/${userId}`,
                  )
                  .remove();
              }

              database()
                .ref(
                  `/categories/${userType}/${values.category}/members/${userId}`,
                )
                .set(true);

              database()
                .ref(`/${userType}/${userId}`)
                .set({
                  imageURI: url,
                  name: values.name,
                  category: values.category,
                  subcategory: values.subcategory,
                  city: values.city,
                  province: values.province,
                  price: values.price,
                  description: values.description,
                })
                .then(() => {
                  actions.setSubmitting(false);
                  navigation.navigate('Profile');
                });
            })
            .catch((err) => {});
        };

        if (!values.imageURI.startsWith('http')) {
          storagePutFile();
        } else {
          databasePutData();
        }
      }}>
      {(formik) => (
        <View style={styles.container}>
          <ImageBackground
            style={styles.imageBackground}
            source={{
              uri: formik.values.imageURI == '' ? null : formik.values.imageURI,
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Icon style={styles.backIcon} name="arrow-left" size={32} />
            </TouchableWithoutFeedback>
            <View style={styles.centerContainer}>
              <TouchableWithoutFeedback
                onPress={() => {
                  ImagePicker.launchImageLibrary(
                    {
                      noData: true,
                    },
                    (response) => {
                      formik.setFieldTouched('imageURI', true);
                      if (
                        !response.didCancel &&
                        response.fileSize <= 5 * 1024 * 1024 &&
                        response.errorCode == null
                      ) {
                        formik.setFieldValue('imageURI', response.uri);
                      }
                    },
                  );
                }}>
                <MaterialCommunityIcon
                  style={styles.addImage}
                  name="camera-plus"
                  size={48}
                />
              </TouchableWithoutFeedback>
              {formik.touched.imageURI && formik.errors.imageURI && (
                <Text style={styles.errorText}>{formik.errors.imageURI}</Text>
              )}
            </View>
          </ImageBackground>

          <DescriptionBottomSheet snapPoints={[100, SCREEN_HEIGHT - 132]}>
            <TextInput
              style={{...styles.textInput, marginTop: 32}}
              placeholder="Nama"
              placeholderTextColor="#4F4F4F"
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <Text style={styles.errorText}>{formik.errors.name}</Text>
            )}

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formik.values.category}
                style={styles.pickerInput}
                itemStyle={styles.pickerText}
                onValueChange={(itemValue) => {
                  formik.setFieldValue('category', itemValue);
                }}>
                {categories.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.label}
                      value={item.value}
                    />
                  );
                })}
              </Picker>
            </View>
            {formik.touched.category && formik.errors.category && (
              <Text style={styles.errorText}>{formik.errors.category}</Text>
            )}

            <TextInput
              style={styles.textInput}
              placeholder="Sub Kategori"
              placeholderTextColor="#4F4F4F"
              onChangeText={formik.handleChange('subcategory')}
              onBlur={formik.handleBlur('subcategory')}
              value={formik.values.subcategory}
            />
            {formik.touched.subcategory && formik.errors.subcategory && (
              <Text style={styles.errorText}>{formik.errors.subcategory}</Text>
            )}

            <TextInput
              style={styles.textInput}
              placeholder="Kota"
              placeholderTextColor="#4F4F4F"
              onChangeText={formik.handleChange('city')}
              onBlur={formik.handleBlur('city')}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city && (
              <Text style={styles.errorText}>{formik.errors.city}</Text>
            )}

            <TextInput
              style={styles.textInput}
              placeholder="Provinsi"
              placeholderTextColor="#4F4F4F"
              onChangeText={formik.handleChange('province')}
              onBlur={formik.handleBlur('province')}
              value={formik.values.province}
            />
            {formik.touched.province && formik.errors.province && (
              <Text style={styles.errorText}>{formik.errors.province}</Text>
            )}

            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Harga"
              placeholderTextColor="#4F4F4F"
              onChangeText={formik.handleChange('price')}
              onBlur={formik.handleBlur('price')}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price && (
              <Text style={styles.errorText}>{formik.errors.price}</Text>
            )}

            <TextInput
              multiline={true}
              style={{...styles.textInput, height: 256}}
              placeholder="Deskripsi"
              placeholderTextColor="#4F4F4F"
              onChangeText={formik.handleChange('description')}
              onBlur={formik.handleBlur('description')}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <Text style={styles.errorText}>{formik.errors.description}</Text>
            )}

            <View style={styles.buttonView}>
              <TouchableOpacity
                onPress={() => {
                  formik.handleSubmit();
                }}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>SIMPAN</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <View style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>BATAL</Text>
                </View>
              </TouchableOpacity>
            </View>
          </DescriptionBottomSheet>
        </View>
      )}
    </Formik>
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
    marginTop: SCREEN_HEIGHT / 2 - 100 - 48,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeTextInput: {
    marginEnd: 10,
    backgroundColor: '#F2F2F2',
    color: '#222832',
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 8,
    marginTop: 16,
    width: 50,
    height: 48,
    textAlignVertical: 'top',
  },
  addImage: {
    alignSelf: 'center',
    color: '#FFFFFF',
    textShadowOffset: {width: 0, height: 0},
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
    textShadowOffset: {width: 0, height: 0},
    textShadowColor: '#A2A2A2',
    textShadowRadius: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#EA3C53',
  },
  textInput: {
    backgroundColor: '#F2F2F2',
    color: '#222832',
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 8,
    marginTop: 16,
    height: 48,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E2E2',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 16,
  },
  pickerInput: {
    color: '#222832',
  },
  buttonView: {
    marginTop: 40,
    marginBottom: 120,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#FF8D6F',
    width: SCREEN_WIDTH / 2.8,
    padding: 16,
    borderRadius: 15,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF0000',
    borderWidth: 1,
    width: SCREEN_WIDTH / 2.8,
    padding: 16,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  removeButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: 'black',
  },
  cancelButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#FF0000',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    width: (SCREEN_WIDTH * 4) / 5,
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
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25,
  },
  acceptModalButton: {
    backgroundColor: '#FF8D6F',
    width: 70,
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
    marginLeft: 16,
  },
  cancelModalButton: {
    backgroundColor: '#FFFFFF',
    width: 70,
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF0000',
  },
});
