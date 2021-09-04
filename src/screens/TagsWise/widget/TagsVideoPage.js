import React, {useEffect} from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Box,
  Thumbnail,
  VideoDescription,
  SubHeadingText,
  PlainText,
} from '../../../components';
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
import {ProfileAvtar} from '../../../assets/images';
import {VIDEO_DETAILS} from '../../../navigator/routes';

const TagsVideoPage = ({
  navigation,
  getTagsDataList,
  getCurrentVideo_Action,
  getCurrentVideo,
  getCommentAction,
  getCommentData,
  getVideoPlaylistAction,
  getVideo_PlaylistData,
}) => {
  const onClickTagsDataVideo = async ({tagsDataItem}) => {
    navigation.navigate(VIDEO_DETAILS, {
      videoItem: tagsDataItem,
    });

    try {
      const getPlayerVideo = {
        videoData: tagsDataItem,
      };
      await getCurrentVideo_Action(getPlayerVideo);

      await getCommentAction(tagsDataItem?.id);
      await getVideoPlaylistAction(tagsDataItem?.id);
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
        {getTagsDataList.map((tagsDataItem, index) => {
          return (
            <Box>
              <TouchableOpacity
                onPress={() => onClickTagsDataVideo({tagsDataItem})}>
                <Thumbnail videoItem={tagsDataItem} />
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
  app: {
    getTagsDataList,
    getCurrentVideo,
    getCommentData,
    getVideo_PlaylistData,
  },
}) => ({
  getTagsDataList,
  getCurrentVideo,
  getCommentData,
  getVideo_PlaylistData,
});
export default connect(mapStateToProps, {
  getCurrentVideo_Action,
  getCommentAction,
  getVideoPlaylistAction,
})(TagsVideoPage);
