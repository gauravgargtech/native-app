import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Box,
  SubHeadingText,
  PlainText,
  Input,
  Textinput,
  Button,
} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import {Colors, fontSizes, fonts} from '../../../theme';
import auth, {firebase} from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {LOGIN} from '../../../navigator/routes';

const SnackbarComponent = props => {
  Snackbar.show({
    text: props,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: Colors.red,
  });
};

const RegisterPage = ({navigation}) => {
  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Username Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email Address Required'),
    password: Yup.string().required('Password Required'),
  });

  const onClickSubmit = values => {
    console.log('Submit Register data successfully', values);
    auth()
      .createUserWithEmailAndPassword(values.email.trim(), values.password)
      .then(() => {
        console.log('User account created & signed in!');
        const currentuser = firebase.auth().currentUser;
        navigation.navigate(LOGIN);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          SnackbarComponent(
            'The email address is already in use by another account.',
          );
        }
        if (error.code === 'auth/invalid-email') {
          SnackbarComponent('That email address is invalid!');
        }
        if (error.code === 'auth/weak-password') {
          SnackbarComponent('The given password is invalid.');
        }
        console.error(error);
      });
  };

  return (
    <Box flex={1}>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={values => onClickSubmit(values)}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <>
            <Box flex={1} justifyContent={'center'} alignItems={'center'}>
              <Box>
                <SubHeadingText
                  color={Colors.blackColor}
                  fontSize={fontSizes[4]}>
                  Register Page
                </SubHeadingText>
              </Box>
              <Box style={styles.registerFormView}>
                <Input
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  placeholder={'Enter User Name'}
                  style={{
                    fontSize: fontSizes[1.2],
                    fontFamily: fonts.RobotoRegular,
                  }}
                  placeholderTextColor={Colors.black}
                  errorMessage={errors.username}
                  errorStyle={{fontSize: fontSizes[1.2], right: 5}}
                />
                <Input
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder={'Enter Email'}
                  style={{
                    fontSize: fontSizes[1.2],
                    fontFamily: fonts.RobotoRegular,
                  }}
                  placeholderTextColor={Colors.black}
                  errorMessage={errors.email}
                  errorStyle={{fontSize: fontSizes[1.2], right: 5}}
                />
                <Input
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={true}
                  placeholder={'Enter Password'}
                  style={{
                    fontSize: fontSizes[1.2],
                    fontFamily: fonts.RobotoRegular,
                  }}
                  placeholderTextColor={Colors.black}
                  errorMessage={errors.password}
                  errorStyle={{fontSize: fontSizes[1.2], right: 5}}
                />
              </Box>
            </Box>
            <Box mt={10} justifyContent={'flex-end'} alignItems={'center'}>
              <Button
                title={'Submit'}
                buttonStyle={styles.btnStyleSubmit}
                titleStyle={styles.btnTitleSubmit}
                onPress={handleSubmit}
              />
            </Box>
          </>
        )}
      </Formik>
    </Box>
  );
};
const styles = StyleSheet.create({
  registerFormView: {
    padding: ms(5),
    width: wp('90%'),
    justifyContent: 'space-evenly',
  },
  txtError: {
    fontSize: fontSizes[2],
    padding: 5,
    paddingVertical: 20,
    color: Colors.red,
  },
  btnStyleSubmit: {
    width: wp('84%'),
    paddingHorizontal: 15,
    backgroundColor: Colors.SetupKidsButton,
  },
  btnTitleSubmit: {
    color: Colors.white,
    fontFamily: fonts.RobotoBold,
    fontSize: fontSizes[3],
  },
});
export default RegisterPage;
