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
import TagList from './widget/TagList';
import VideoList from './widget/VideoList';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import {
  SignUP,
  Signup_medium,
  Signup_large,
  SearchIcon,
  MenuIcon,
} from '../../assets/images';

const Home = ({navigation}) => {
  return (
    <Box flex={1} backgroundColor={Colors.lightWhite} as={SafeAreaView}>
      <StatusBar barStyle={'dark-content'} />
      <CustomHeader
        navigation={navigation}
        menu={MenuIcon}
        headerName={'LearnReadApp'}
        SearchIcon={SearchIcon}
        SignUP={SignUP}
      />
      <Box style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TagList navigation={navigation} />
            <VideoList navigation={navigation} />
          </ScrollView>
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
  },
});
export default Home;
