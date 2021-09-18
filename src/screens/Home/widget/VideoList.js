import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Loader, Thumbnail} from '../../../components';
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
  isConnected,
}) => {
  const onClickVideo = async ({videoItem}) => {
    navigation.navigate(VIDEO_DETAILS, {
      videoItem: videoItem,
    });

    try {
      if (isConnected) {
        const getPlayerVideo = {
          videoData: videoItem,
        };
        await getCurrentVideo_Action(getPlayerVideo);

        await getCommentAction(videoItem?.id);
        await getVideoPlaylistAction(videoItem.id);
      } else {
        return <Loader />;
      }
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
        {getVideoList
          .sort((a, b) => (a.date_posted > b.date_posted ? 1 : -1))
          .map((videoItem, index) => {
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
  app: {
    getVideoList,
    getCurrentVideo,
    getCommentData,
    getVideo_PlaylistData,
    isConnected,
  },
}) => ({
  getVideoList,
  getCurrentVideo,
  getCommentData,
  getVideo_PlaylistData,
  isConnected,
});
export default connect(mapStateToProps, {
  getCurrentVideo_Action,
  getCommentAction,
  getVideoPlaylistAction,
})(VideoList);
