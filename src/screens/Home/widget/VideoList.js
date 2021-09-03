import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Box, Thumbnail} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms, s, vs} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../../theme';
import {
  getCurrentVideo_Action,
  getCommentAction,
  getVideoPlaylistAction,
} from '../../../store/actions';
import {connect} from 'react-redux';
import {VIDEO_DETAILS} from '../../../navigator/routes';

const VideoList = ({
  navigation,
  getVideoList,
  getCurrentVideo_Action,
  getCurrentVideo,
  getCommentAction,
  getCommentData,
  getVideoPlaylistAction,
  getVideo_PlaylistData,
}) => {
  const onClickVideo = async ({videoItem}) => {
    navigation.navigate(VIDEO_DETAILS, {
      videoItem: videoItem,
    });

    try {
      const getPlayerVideo = {
        videoData: videoItem,
      };
      await getCurrentVideo_Action(getPlayerVideo);

      await getCommentAction(videoItem?.id);
      await getVideoPlaylistAction(videoItem.id);
    } catch (e) {
      console.log('ERRORS AT GET_VIDEO_DATA', e);
    }
  };
  return (
    <Box
      flex={0.9}
      justifyContent={'flex-start'}
      style={{paddingHorizontal: ms(10)}}>
      <Box p={ms(5)}>
        {getVideoList.map((videoItem, index) => {
          return (
            <Box>
              <TouchableOpacity onPress={() => onClickVideo({videoItem})}>
                <Thumbnail videoItem={videoItem} />
              </TouchableOpacity>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  thumbnailImageStyle: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: wp('90%'),
    height: Platform.OS === 'ios' ? hp('18%') : hp('22%'),
    borderRadius: 3,
  },
  total_timingView: {
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    right: Platform.OS === 'ios' ? '13%' : wp('9.8%'),
    bottom: vs(5),
    width: s(30),
    height: hp('2%'),
  },
  videoDescriptionMainContainer: {
    marginLeft: ms(20),
    padding: ms(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoDescriptionView: {
    marginLeft: 10,
    padding: ms(10),
    width: Platform.OS === 'ios' ? '65%' : '70%',
    justifyContent: 'space-evenly',
  },
  channelIcon: {
    width: wp('16%'),
    height: hp('8%'),
    borderRadius: 90 / 2,
  },
});
const mapStateToProps = ({
  app: {getVideoList, getCurrentVideo, getCommentData, getVideo_PlaylistData},
}) => ({
  getVideoList,
  getCurrentVideo,
  getCommentData,
  getVideo_PlaylistData,
});
export default connect(mapStateToProps, {
  getCurrentVideo_Action,
  getCommentAction,
  getVideoPlaylistAction,
})(VideoList);
