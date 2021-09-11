import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Alert,
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
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [currentTime, setCurrentTime] = useState();
  const afterTwomin = moment().add(6, 'minutes').format('LTS');
  const isFocused = useIsFocused();
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(moment().format('LTS'));
    }, 1000);
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

  console.log('current time first', currentTime);
  function addMinutes(time, minsToAdd) {
    function D(J) {
      return (J < 10 ? '0' : '') + J;
    }
    var piece = time.split(':');
    var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

    return D(((mins % (24 * 60)) / 60) | 0) + ':' + D(mins % 60);
  }

  const match = currentTime.split(':');
  const finalCurrentTime = match[0] + ':' + match[1];
  console.log('finalCurrentTime', finalCurrentTime);
  const getData = async () => {
    try {
      console.log('get data');
      const value = await AsyncStorage.getItem('beta_versionKey');
      console.log('storage value ', value);
      const addMin = 53;
      const afterTenmin = addMinutes(value, addMin);
      console.log('Afetr 10 min ', afterTenmin);
      if (value !== null) {
        console.log('storage value ', value);
        console.log('current time', currentTime);
        if (afterTenmin == finalCurrentTime) {
          Alert.alert('Please Take a subscription');
        }
      }
    } catch (e) {
      // error reading value
    }
  };

  useMemo(async () => {
    getData();
    console.log('use memo');
  }, [currentTime]);

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
