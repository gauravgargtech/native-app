import React, {useEffect} from 'react';
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
import VideoDeatilsPage from './widget/VideoDetailsPage';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import {
  getVideoDetailsAction,
  getVideoPlaylistAction,
} from '../../store/actions';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const VideoDetails = ({
  navigation,
  route,
  getVideoDetailsAction,
  getVideoDetailsData,
  getVideoPlaylistAction,
  getVideo_PlaylistData,
}) => {
  const {videoItem} = route.params ?? {};
  console.log('get Video Details ID::', videoItem?.id);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      const func = async () => {
        try {
          getVideoDetailsAction(videoItem?.id);
          getVideoPlaylistAction(videoItem?.id);
        } catch (e) {
          alert('error while get video Details');
        }
      };
      func();
    }
  }, [isFocused]);
  return (
    <Box flex={1} backgroundColor={Colors.lightWhite} as={SafeAreaView}>
      <StatusBar barStyle={'dark-content'} />
      <CustomHeader navigation={navigation} headerName={'LearnReadApp'} />
      <Box style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <VideoDeatilsPage navigation={navigation} route={route} />
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
const mapStateToProps = ({
  app: {getVideoDetailsData, getVideo_PlaylistData},
}) => ({
  getVideoDetailsData,
  getVideo_PlaylistData,
});
export default connect(mapStateToProps, {
  getVideoDetailsAction,
  getVideoPlaylistAction,
})(VideoDetails);
