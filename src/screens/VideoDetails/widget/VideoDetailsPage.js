import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Box,
  Button,
  Thumbnail,
  VideoDescription,
  Videoplayer,
  CommentList,
  SubHeadingText,
  Loader,
  Input,
  Textinput,
  CustomHeader,
  HeadingText,
} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms, vs, s} from 'react-native-size-matters';
import {Colors, fonts, fontSizes} from '../../../theme';
import {ProfileAvtar} from '../../../assets/images';
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import {
  getVideoPlaylistAction,
  addCommentAction,
  getCommentAction,
  getCurrentVideo_Action,
} from '../../../store/actions';
import {connect} from 'react-redux';
import moment from 'moment';
import {VIDEO_DETAILS} from '../../../navigator/routes';
const ChannelIconUrl = imageURL => `https://kid.greatequip.com${imageURL}`;

const VideoDeatilsPage = ({
  navigation,
  route,
  getVideoPlaylistAction,
  getVideo_PlaylistData,
  addCommentAction,
  addCommentData,
  getCurrentVideo_Action,
  getCurrentVideo,
  getCommentAction,
  getCommentData,
}) => {
  const {videoItem} = route.params ?? {};

  const [commentText, setCommentText] = useState(null);
  const [isCommentfocus, setIsCommentFocus] = useState(false);

  console.log('current item ID', getCurrentVideo?.videoData?.id);

  const Player = useMemo(() => {
    return Videoplayer;
  }, [getCurrentVideo]);

  const onFocus = () => {
    setIsCommentFocus(true);
  };
  const onBlur = () => {
    setIsCommentFocus(false);
  };

  const AddComment = async () => {
    const videoID = getCurrentVideo?.videoData?.id;
    const comment = commentText;
    const userID = 0;
    if (comment != null) {
      await addCommentAction(videoID, comment, userID);
      setCommentText(null);
    }
    Alert.alert(`Message : ${addCommentData?.data.message}`);
  };

  const onClickVideo = async ({playlistItem}) => {
    try {
      const getPlayerVideo = {
        videoData: playlistItem,
      };
      await getCurrentVideo_Action(getPlayerVideo);

      await getCommentAction(playlistItem?.id);
      await getVideoPlaylistAction(playlistItem?.id);
    } catch (e) {
      console.log('ERRORS AT GET_VIDEO_DATA', e);
    }
  };

  return (
    <>
      <Box flex={1}>
        <Player navigation={navigation} />
        {/*{!state.fullscreen ? (*/}
        {/*  <>*/}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box p={ms(20)}>
            <SubHeadingText fontSize={fontSizes[3]}>
              Video Details
            </SubHeadingText>
          </Box>
          <Box p={ms(10)} flexDirection={'row'} alignItems={'center'}>
            <Image
              source={{
                uri: ChannelIconUrl(getCurrentVideo?.videoData?.channel_icon),
              }}
              style={styles.channelIcon}
            />
            <Box style={styles.videoDescriptionView}>
              <VideoDescription videoItem={getCurrentVideo?.videoData} />
            </Box>
          </Box>
          <Box p={ms(20)}>
            <SubHeadingText fontSize={fontSizes[3]}>comment</SubHeadingText>
            <Box p={ms(10)}>
              {getCommentData?.map(commentItem => {
                return <CommentList commentList={commentItem} />;
              })}
            </Box>
            {addCommentData?.loading ? <Loader /> : null}
            <Box p={ms(10)} flexDirection={'row'} alignItems={'center'}>
              <Image source={ProfileAvtar} style={styles.channelIcon} />
              <Box style={styles.videoAddCommentView}>
                <Box
                  flex={1}
                  height={hp('8%')}
                  style={[
                    styles.TextInputContainer,
                    {
                      borderColor: isCommentfocus
                        ? Colors.blueclr
                        : Colors.grey,
                    },
                  ]}>
                  <Textinput
                    value={commentText}
                    onChangeText={val => setCommentText(val)}
                    placeholder={'Add Public Comment'}
                    style={{
                      fontSize: fontSizes[1.2],
                      fontFamily: fonts.RobotoRegular,
                    }}
                    placeholderTextColor={Colors.black}
                    onFocus={() => onFocus()}
                    onBlur={() => onBlur()}
                  />
                </Box>
              </Box>
            </Box>
            <Box p={ms(5)}>
              <Button
                disabled={!commentText?.length ? true : false}
                title={'Comment'}
                buttonStyle={styles.btnStyleComment}
                titleStyle={styles.btnTitleComment}
                onPress={() => AddComment()}
              />
            </Box>
            <Box style={{paddingVertical: ms(10)}}>
              <SubHeadingText fontSize={fontSizes[3]}>PlayList</SubHeadingText>
              <Box style={{paddingTop: ms(20)}}>
                {getVideo_PlaylistData?.loading ? (
                  <Loader />
                ) : (
                  getVideo_PlaylistData?.playList?.map(playlistItem => {
                    return (
                      <Box>
                        <TouchableOpacity
                          onPress={() => onClickVideo({playlistItem})}>
                          <Thumbnail
                            videoItem={playlistItem}
                            descriptionStyle={
                              styles.videoDescriptionPlaylistView
                            }
                            channelStyle={styles.channelIcon}
                          />
                        </TouchableOpacity>
                      </Box>
                    );
                  })
                )}
              </Box>
            </Box>
          </Box>
        </ScrollView>
        {/*  </>*/}
        {/*) : null}*/}
      </Box>
    </>
  );
};
const styles = StyleSheet.create({
  videoDescriptionView: {
    marginLeft: 10,
    padding: ms(10),
    width: wp('75%'),
    justifyContent: 'space-evenly',
  },
  videoAddCommentView: {
    marginLeft: 10,
    padding: ms(10),
    width: wp('70%'),
    justifyContent: 'space-evenly',
  },
  TextInputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.grey,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  btnStyleComment: {
    borderRadius: 30,
  },
  btnTitleComment: {
    color: Colors.white,
    fontFamily: fonts.RobotoBold,
    fontSize: fontSizes[4],
  },
  channelIcon: {
    width: wp('15%'),
    height: hp('8%'),
    borderRadius: 100 / 2,
  },

  //Playlist_style
  videoDescriptionPlaylistView: {
    marginLeft: 10,
    padding: ms(10),
    width: Platform.OS === 'ios' ? '65%' : '72%',
    justifyContent: 'space-evenly',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
});
const mapStateToProps = ({
  app: {getVideo_PlaylistData, addCommentData, getCommentData, getCurrentVideo},
}) => ({
  getVideo_PlaylistData,
  addCommentData,
  getCommentData,
  getCurrentVideo,
});
export default connect(mapStateToProps, {
  getVideoPlaylistAction,
  addCommentAction,
  getCommentAction,
  getCurrentVideo_Action,
})(VideoDeatilsPage);
