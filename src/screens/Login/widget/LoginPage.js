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
import {HOME} from '../../../navigator/routes';

const SnackbarComponent = props => {
  Snackbar.show({
    text: props,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: Colors.red,
  });
};

const LoginPage = ({navigation}) => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email Address Required'),
    password: Yup.string().required('Password Required'),
  });

  const onClickLogin = values => {
    console.log('Submit Login data successfully', values);
    auth()
      .signInWithEmailAndPassword(values.email.trim(), values.password)
      .then(() => {
        console.log('User account signed in!');
        const currentuser = firebase.auth().currentUser;
        navigation.navigate(HOME);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          SnackbarComponent('That email address is invalid!');
        }
        if (error.code === 'auth/user-not-found') {
          SnackbarComponent(
            'There is no user record corresponding to this identifier. The user may have been deleted.',
          );
        }
        if (error.code === 'auth/wrong-password') {
          SnackbarComponent(
            'The password is invalid or the user does not have a password.',
          );
        }
        console.error(error);
      });
  };

  return (
    <Box flex={1}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={values => onClickLogin(values)}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <>
            <Box flex={1} justifyContent={'center'} alignItems={'center'}>
              <Box>
                <SubHeadingText
                  color={Colors.blackColor}
                  fontSize={fontSizes[4]}>
                  Login Page
                </SubHeadingText>
              </Box>
              <Box style={styles.loginFormView}>
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
            <Box mt={10} justifyContent={'flex-end'}>
              <Box alignItems={'center'}>
                <Button
                  title={'Login'}
                  buttonStyle={styles.btnStyleLogin}
                  titleStyle={styles.btnTitleLogin}
                  onPress={handleSubmit}
                />
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </Box>
  );
};
const styles = StyleSheet.create({
  loginFormView: {
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
  btnStyleLogin: {
    width: wp('84%'),
    paddingHorizontal: 15,
    backgroundColor: Colors.SetupKidsButton,
  },
  btnTitleLogin: {
    color: Colors.white,
    fontFamily: fonts.RobotoBold,
    fontSize: fontSizes[3],
  },
});
export default LoginPage;
