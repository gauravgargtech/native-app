import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Box, Header, CustomHeader, Loader} from '../../components/index';
import {useIsFocused} from '@react-navigation/native';
import {Colors} from '../../theme';
import TagList from './widget/TagList';
import VideoList from './widget/VideoList';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  getTagsAction,
  getVideoListAction,
  getLoginUser_Action,
} from '../../store/actions';
import {connect} from 'react-redux';
import {ms} from 'react-native-size-matters';
import {SignUP, SignIn, SearchIcon, MenuIcon} from '../../assets/images';

const Home = ({
  route,
  navigation,
  getTagsAction,
  getTagsData,
  getVideoListAction,
  getVideoList,
  getLoginUser_Action,
}) => {
  const {currentUser} = route.params ?? {};
  console.log('current user', currentUser);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      const func = async () => {
        try {
          await getTagsAction();
          await getVideoListAction();
          if (currentUser != undefined) {
            await getLoginUser_Action(currentUser);
          }
        } catch (e) {
          alert('error while get Tags Data');
        }
      };
      func();
    }
  }, [isFocused]);
  return (
    <Box flex={1} backgroundColor={Colors.lightWhite} as={SafeAreaView}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <CustomHeader
        navigation={navigation}
        menu={MenuIcon}
        headerName={'LearnReadApp'}
        search={SearchIcon}
        SignIN={SignIn}
      />
      <Box style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
          {getTagsData?.loading ? (
            <Loader />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <TagList navigation={navigation} />
              <VideoList navigation={navigation} />
            </ScrollView>
          )}
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
const mapStateToProps = ({
  app: {getTagsData, getVideoList, getCurrentUserData},
}) => ({
  getTagsData,
  getVideoList,
  getCurrentUserData,
});
export default connect(mapStateToProps, {
  getTagsAction,
  getVideoListAction,
  getLoginUser_Action,
})(Home);
