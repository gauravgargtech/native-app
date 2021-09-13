import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Alert,
  BackHandler,
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

const today = new Date();
var date =
  today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
var time =
  (today.getHours() % 12) + ':' + today.getMinutes() + ':' + today.getSeconds();

const Home = ({
  route,
  navigation,
  getTagsAction,
  getTagsData,
  getVideoListAction,
  getVideoList,
  getLoginUser_Action,
  getCurrentUserData,
}) => {
  const {currentUser} = route.params ?? {};
  const [currentDate, setCurrentDate] = useState(date);
  const [currentTime, setCurrentTime] = useState(time);
  const [showAlert, setShowAlert] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    setCurrentTime(time);
    setCurrentDate(date);
    getData();
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

  console.log('getCurrentUserData', getCurrentUserData);

  console.log('current date first', currentDate);
  console.log('current time first', currentTime);

  function addDays(value, days) {
    if (value != null) {
      let unix_timestamp = value;
      let formattedDate;
      let formattedTime;
      const date = new Date(unix_timestamp);
      const Days = moment(date).add(days, 'days').format('DD-M-YYYY');
      //
      // const hours = date.getHours() % 12;
      // const minutes = '0' + (date.getMinutes() + days);
      // const seconds = '0' + date.getSeconds();
      formattedDate = Days;
      console.log('formattedDate', formattedDate);
      // formattedTime =
      //   hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      // console.log('formattedTime', formattedTime);
      return formattedDate;
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log('storage value ', value);
      const addTrailDays = addDays(value, 7);
      console.log('Completed beta version ', addTrailDays);
      console.log('current Timestamp', currentDate);
      if (getCurrentUserData?.length != 0) {
        if (value !== null) {
          if (new Date(addTrailDays) >= new Date(currentDate)) {
            setShowAlert(true);
            if (showAlert == true) {
              Alert.alert('Please Take a subscription');
              setShowAlert(false);
            }
          } else {
            Alert.alert('You must have a subscription');
            setInterval(() => {
              BackHandler.exitApp();
            }, 3000);
          }
        }
      }
    } catch (e) {
      console.log('Reading Error', e);
    }
  };

  useMemo(async () => {
    getData();
  }, [currentDate]);

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
