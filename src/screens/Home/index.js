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
  BetaVersion_action,
} from '../../store/actions';
import {connect} from 'react-redux';
import {ms} from 'react-native-size-matters';
import {SignUP, SignIn, SearchIcon, MenuIcon} from '../../assets/images';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HOME} from '../../navigator/routes';

const Home = ({
  navigation,
  getTagsAction,
  getTagsData,
  getVideoListAction,
  getVideoList,
  RegisterUser,
  BetaVersion_action,
  betaVersion,
  isConnected,
}) => {
  const today = new Date();
  const date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  const [currentDate, setCurrentDate] = useState(date);
  const isFocused = useIsFocused();

  useEffect(() => {
    setCurrentDate(date);
    getData();
    if (isFocused) {
      const func = async () => {
        try {
          if (isConnected) {
            await getTagsAction();
            await getVideoListAction();
          }
        } catch (e) {
          alert('error while get Tags Data');
        }
      };
      func();
    }
  }, [isFocused]);

  function addDays(value, days) {
    if (value != null) {
      let unix_timestamp = value;
      let formattedDate;
      const date = new Date(unix_timestamp);
      const Days = moment(date).add(days, 'days').format('DD-M-YYYY');
      formattedDate = Days;
      return formattedDate;
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      const addTrailDays = addDays(value, 7);
      console.log('Completed beta version Date ', addTrailDays);
      console.log('current Date', currentDate);
      var CompleteTrailDate=new Date(addTrailDays);
      var ContinueTrailDate=new Date(currentDate);
      if (RegisterUser?.success != false) {
        if (value != null) {
          if (CompleteTrailDate >= ContinueTrailDate) {
            console.log('beta version', betaVersion);
            if (betaVersion == true) {
              Alert.alert('Please Take a subscription');
              BetaVersion_action(false);
            }
          } else {
            Alert.alert('You must have a subscription');
            navigation.navigate(HOME);
          }
        }
      }
    } catch (e) {
      console.log('Reading Error', e);
    }
  };

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
  app: {getTagsData, getVideoList, RegisterUser, betaVersion, isConnected},
}) => ({
  getTagsData,
  getVideoList,
  RegisterUser,
  betaVersion,
  isConnected,
});
export default connect(mapStateToProps, {
  getTagsAction,
  getVideoListAction,
  BetaVersion_action,
})(Home);
