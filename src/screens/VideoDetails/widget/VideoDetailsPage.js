import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  Box,
  Button,
  VideoDescription,
  PlainText,
  SubHeadingText,
} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms, vs, s} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../../theme';
import {ProfileAvtar} from '../../../assets/images';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {connect} from 'react-redux';

const VideoDeatilsPage = ({navigation, route, getVideo_PlaylistData}) => {
  const {videoItem} = route.params ?? {};
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

  const onSeek = seek => {
    videoPlayer?.current.seek(seek);
  };

  const onSeeking = currentVideoTime => setCurrentTime(currentVideoTime);

  const onPaused = newState => {
    setPaused(!paused);
    setPlayerState(newState);
  };

  const onReplay = () => {
    videoPlayer?.current.seek(currentTime);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  const onProgress = data => {
    setCurrentTime(Math.round(data.currentTime));
  };

  const onLoad = data => {
    setDuration(Math.round(data.duration));
  };
  const onEnd = () => {
    setCurrentTime(duration);
  };

  return (
    <Box flex={1}>
      <Box height={hp('30%')}>
        <Video
          ref={ref => (videoPlayer.current = ref)}
          source={{
            uri: videoItem?.url,
          }}
          repeat={true}
          fullscreen={true}
          volume={1.0}
          onLoad={onLoad}
          onProgress={onProgress}
          onEnd={onEnd}
          onError={e => console.log('error::', e)}
          resizeMode={'cover'}
          paused={paused}
          ignoreSilentSwitch={'ignore'}
          posterResizeMode={'cover'}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width * (9 / 16),
          }}
          controls={true}
        />
        {/*<Video*/}
        {/*  source={{*/}
        {/*    uri: videoItem?.url,*/}
        {/*  }}*/}
        {/*  ref={ref => (videoPlayer.current = ref)}*/}
        {/*  controls={true}*/}
        {/*  playInBackground={true}*/}
        {/*  onLoad={onLoad}*/}
        {/*  onProgress={onProgress}*/}
        {/*  onEnd={onEnd}*/}
        {/*  paused={paused}*/}
        {/*  style={styles.backgroundVideo}*/}
        {/*/>*/}
        {/*<MediaControls*/}
        {/*  isFullScreen={false}*/}
        {/*  duration={duration}*/}
        {/*  progress={currentTime}*/}
        {/*  onPaused={onPaused}*/}
        {/*  onReplay={onReplay}*/}
        {/*  onSeek={onSeek}*/}
        {/*  onSeeking={onSeeking}*/}
        {/*  mainColor={'red'}*/}
        {/*  playerState={playerState}*/}
        {/*/>*/}
      </Box>
      <Box p={ms(10)} flexDirection={'row'} alignItems={'center'}>
        <Image source={ProfileAvtar} style={styles.channelIcon} />
        <Box style={styles.videoDescriptionView}>
          <VideoDescription videoItem={videoItem} />
        </Box>
      </Box>
      <Box p={ms(20)}>
        <SubHeadingText fontSize={fontSizes[3]}>Video Details</SubHeadingText>
        <SubHeadingText fontSize={fontSizes[3]}>comment</SubHeadingText>
        <Box style={{paddingVertical: ms(10)}}>
          <SubHeadingText fontSize={fontSizes[3]}>PlayList</SubHeadingText>
          <Box style={{paddingTop: ms(20)}}>
            {getVideo_PlaylistData.map(playlistItem => {
              return (
                <Box>
                  <ImageBackground
                    source={{
                      uri: playlistItem?.thumbnail,
                    }}
                    style={styles.thumbnailImageStyle}
                    resizeMode={'contain'}>
                    <Box style={styles.total_timingView}>
                      <PlainText color={Colors.white}>
                        {playlistItem?.total_time}
                      </PlainText>
                    </Box>
                  </ImageBackground>
                  <Box style={styles.videoDescriptionMainContainer}>
                    <Image
                      source={ProfileAvtar}
                      style={styles.channelIcon}
                      resizeMode={'contain'}
                    />
                    <Box style={styles.videoDescriptionPlaylistView}>
                      <VideoDescription videoItem={playlistItem} />
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  videoDescriptionView: {
    marginLeft: 10,
    padding: ms(10),
    width: wp('75%'),
    justifyContent: 'space-evenly',
  },
  channelIcon: {
    width: wp('15%'),
    height: hp('8%'),
    borderRadius: 100 / 2,
  },

  //Playlist_style
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
    right: Platform.OS === 'ios' ? '13%' : '9%',
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
  videoDescriptionPlaylistView: {
    marginLeft: 10,
    padding: ms(10),
    width: Platform.OS === 'ios' ? '65%' : '73%',
    justifyContent: 'space-evenly',
  },
});
const mapStateToProps = ({app: {getVideo_PlaylistData}}) => ({
  getVideo_PlaylistData,
});
export default connect(mapStateToProps, {})(VideoDeatilsPage);
