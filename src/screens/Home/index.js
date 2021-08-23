import React from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Box, Header, CustomHeader} from '../../components/index';
import {Colors} from '../../theme';
import HomePage from './widget/HomePage';
import VideoList from './widget/VideoList';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';

const Home = ({navigation}) => {
  return (
    <Box flex={1} backgroundColor={Colors.lightWhite} as={SafeAreaView}>
      <StatusBar barStyle={'dark-content'} />
      <CustomHeader  headerName={'LearnReadApp'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box style={styles.mainContainer}>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
            <HomePage navigation={navigation} />
            <VideoList navigation={navigation} />
          </KeyboardAvoidingView>
        </Box>
      </ScrollView>
    </Box>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: hp('100%'),
    backgroundColor: Colors.white,
    padding: ms(10),
  },
});
export default Home;
