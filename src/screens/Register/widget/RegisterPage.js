import React, {useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Box, SubHeadingText, Input, Button} from '../../../components';
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
import {LOGIN, REGISTER} from '../../../navigator/routes';
import {Register} from '../../../store/actions';
import {connect} from 'react-redux';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SnackbarComponent = props => {
  Snackbar.show({
    text: props,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: Colors.red,
  });
};

// const date = new Date();
// console.log('current date', moment(date).format('ll'));
// console.log('After 7 days', moment(date).add(7, 'days').format('ll'));
//
// console.log('current time', moment().format('LTS'));
// console.log('After 2 min', moment().add(2, 'minutes').format('LTS'));

const RegisterPage = ({navigation, Register, RegisterUser}) => {
  const unixTimestamp = new Date().valueOf();
  console.log('current timestamp', unixTimestamp);

  const storeData = async value => {
    try {
      console.log('values', value);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      console.log('Saving Error', e);
    }
  };

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email Address Required'),
    password: Yup.string().required('Password Required'),
  });

  const onClickSubmit = (values, resetForm) => {
    storeData(unixTimestamp);
    const data = {
      email: values.email,
      password: values.password,
    };
    const regFunc = async () => {
      try {
        const userdata = await Register(data);
        console.log('Register success', userdata);
        if (userdata?.value?.success == true) {
          navigation.navigate(LOGIN);
          resetForm({values: ''});
        } else {
          SnackbarComponent(userdata?.value?.message);
          navigation.navigate(REGISTER);
          resetForm({values: ''});
        }
      } catch (e) {
        console.log('ERROR WHILE REGISTER', e);
      }
    };
    regFunc();
  };

  const LoginNaviagte = () => {
    navigation.navigate(LOGIN);
  };

  return (
    <Box flex={1}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values, {resetForm}) => {
          onClickSubmit(values, resetForm);
        }}>
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
                  title={'Submit'}
                  buttonStyle={styles.btnStyleSubmit}
                  titleStyle={styles.btnTitleSubmit}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </Box>
              <Box mt={10}>
                <SubHeadingText
                  color={Colors.black}
                  fontSize={fontSizes[0.8]}
                  letterSpacing={-0.2}>
                  Already have an Account?{' '}
                  <SubHeadingText
                    color={Colors.SetupKidsButton}
                    fontSize={fontSizes[0.8]}
                    onPress={() => LoginNaviagte()}>
                    Login
                  </SubHeadingText>
                </SubHeadingText>
              </Box>
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
const mapStateToProps = ({app: {RegisterUser}}) => ({
  RegisterUser,
});
export default connect(mapStateToProps, {
  Register,
})(RegisterPage);
