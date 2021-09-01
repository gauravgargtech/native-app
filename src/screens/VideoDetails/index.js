import React, {useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Box, Header} from '../../components/index';
import {Colors} from '../../theme';
import VideoDeatilsPage from './widget/VideoDetailsPage';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import {getVideoDetailsAction} from '../../store/actions';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const VideoDetails = ({
  navigation,
  route,
  getVideoDetailsAction,
  getVideoDetailsData,
}) => {
  const {videoItem} = route.params ?? {};
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      const func = async () => {
        try {
          getVideoDetailsAction(videoItem?.videoData?.id);
        } catch (e) {
          alert('error while get video Details');
        }
      };
      func();
    }
  }, [isFocused]);
  return (
    <Box flex={1} backgroundColor={Colors.lightWhite} as={SafeAreaView}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      {/*<CustomHeader navigation={navigation} headerName={'LearnReadApp'} />*/}
      <Box style={styles.mainContainer}>
        <VideoDeatilsPage navigation={navigation} route={route} />
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
const mapStateToProps = ({app: {getVideoDetailsData}}) => ({
  getVideoDetailsData,
});
export default connect(mapStateToProps, {
  getVideoDetailsAction,
})(VideoDetails);
