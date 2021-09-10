import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Thumbnail} from '../../../components';
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
