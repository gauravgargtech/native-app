import React from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Box, CustomHeader} from '../../components/index';
import {Colors} from '../../theme';
import RegisterPage from './widget/RegisterPage';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';

const Register = ({navigation}) => {
  return (
    <Box flex={1} backgroundColor={Colors.lightWhite} as={SafeAreaView}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <CustomHeader navigation={navigation} headerName={'LearnReadApp'} />
      <Box style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
          <RegisterPage navigation={navigation} />
        </KeyboardAvoidingView>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: hp('100%'),
    backgroundColor: Colors.white,
    padding: ms(20),
  },
});
export default Register;
