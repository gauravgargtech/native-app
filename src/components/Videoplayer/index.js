import React, {useEffect, useMemo, useRef, useState} from 'react';
import {BackHandler, AppState} from 'react-native';
import {
  Box,
  CustomHeader,
  HeadingText,
  PlayerControls,
  ProgressBar,
} from '../../components';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  LayoutAnimation,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Video, {OnSeekData, OnLoadData} from 'react-native-video';
import {FullscreenClose, FullscreenOpen} from '../../assets/icons';
import Orientation from 'react-native-orientation-locker';
import {
  getVideoPlaylistAction,
  getCommentAction,
  getCurrentVideo_Action,
} from '../../store/actions';
import {connect} from 'react-redux';
import moment from 'moment';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import VideoPlayerUrl from '../../assets/video/orginal_lonely.mp4';
import {Colors, fontSizes} from '../../theme';

const OsVer = Platform.constants.Release;
const NEXT_VIDEO_LOADING_COUNT = 5;
const Videoplayer = ({
  navigation,
  getVideoPlaylistAction,
  getVideo_PlaylistData,
  getCommentAction,
  getCommentData,
  getCurrentVideo_Action,
  getCurrentVideo,
}) => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [play, setPlay] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [onEndingStart, setOnEndingStart] = useState(false);
  const videoUrl = getCurrentVideo?.videoData?.url;
  let autoPlayTimerInterval: any;

  const [nextVideoDisableTime, setNextVideoDisableTime] = useState(
    NEXT_VIDEO_LOADING_COUNT,
  );
  const homeAction = nextAppState => {
    if (
      AppState.currentState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      handlePlayPause();
    } else {
      handlePlayPause();
    }
  };

  const backAction = () => {
    Orientation.lockToPortrait();
    return true;
  };

  const onEnd = () => {
    setCurrentTime(duration);
    if (isLoading == false) {
      setOnEndingStart(true);
      setNextVideoDisableTime(NEXT_VIDEO_LOADING_COUNT);
      startResendOtpTimer();
    }
    console.log('Is Loading', isLoading);
    try {
      if (getVideo_PlaylistData?.playList[0] != undefined) {
        const getPlayerVideo = {
          videoData: getVideo_PlaylistData?.playList[0],
        };
        getCurrentVideo_Action(getPlayerVideo);

        getCommentAction(getVideo_PlaylistData?.playList[0]?.id);
        getVideoPlaylistAction(getVideo_PlaylistData?.playList[0]?.id);
      } else {
        Alert.alert('No Available Next Episodes.');
      }
    } catch (e) {
      console.log('ERRORS AT GET_NEXT_VIDEO_DATA', e);
    }
  };

  const startResendOtpTimer = () => {
    if (autoPlayTimerInterval) {
      clearInterval(autoPlayTimerInterval);
    }
    autoPlayTimerInterval = setInterval(() => {
      if (nextVideoDisableTime <= 0) {
        clearInterval(autoPlayTimerInterval);
      } else {
        setNextVideoDisableTime(nextVideoDisableTime - 1);
      }
    }, 1000);
  };

  useEffect(() => {
    startResendOtpTimer();
    Orientation.addOrientationListener(handleOrientation);
    BackHandler.addEventListener('hardwareBackPress', backAction);
    AppState.addEventListener('change', homeAction);
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
      BackHandler.removeEventListener('hardwareBackPress', backAction);
      AppState.removeEventListener('change', homeAction);
      if (autoPlayTimerInterval) {
        clearInterval(autoPlayTimerInterval);
      }
    };
  }, [nextVideoDisableTime]);

  const clearData = () => {
    setDuration(0);
    setCurrentTime(0);
    videoRef?.current?.seek(0);
    setPlay(true);
    setShowControls(true);
    setFullscreen(false);
    setIsLoading(false);
  };

  useMemo(() => {
    clearData();
  }, [getCurrentVideo]);

  function handleOrientation(orientation: string) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (setFullscreen(true), StatusBar.setHidden(true))
      : (setFullscreen(false), StatusBar.setHidden(false));
  }

  const onLoad = data => {
    // const hms = getCurrentVideo?.videoData?.total_time;
    // const a = hms.split('.');
    //
    // if (a.length == 2) {
    //   const total_duration = moment.duration(`00:${a[0]}:${a[1]}`).asSeconds();
    //   setDuration(Math.round(total_duration));
    //   setIsLoading(false);
    // } else {
    //   const total_duration = moment
    //     .duration(`${a[0]}:${a[1]}:${a[2]}`)
    //     .asSeconds();
    //   setDuration(Math.round(total_duration));
    //   setIsLoading(false);
    // }
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onProgress = data => {
    setCurrentTime(Math.round(data.currentTime));
  };

  const handleFullscreen = () => {
    // if (Platform.OS == 'ios') {
    //   videoRef?.current?.presentFullscreenPlayer();
    // } else {
    //   fullscreen
    //     ? Orientation.lockToPortrait()
    //     : Orientation.lockToLandscapeLeft();
    // }
    fullscreen
      ? Orientation.lockToPortrait()
      : Orientation.lockToLandscapeLeft();
  };
  const handlePlayPause = () => {
    if (play) {
      setPlay(false);
      setShowControls(true);
      return;
    }
    setPlay(true);
    setTimeout(() => setShowControls(false), 2000);
  };

  const skipBackward = () => {
    videoRef?.current.seek(currentTime - 10);
    setCurrentTime(currentTime - 10);
  };

  const skipForward = () => {
    videoRef?.current.seek(currentTime + 10);
    setCurrentTime(currentTime + 10);
  };

  const onSeek = seek => {
    videoRef?.current.seek(seek);
  };

  const visibleControls = () => {
    showControls ? setShowControls(false) : setShowControls(true);
  };
  return (
    <>
      {!fullscreen ? (
        <CustomHeader
          navigation={navigation}
          headerName={'LearnReadApp'}
          clearData={clearData}
        />
      ) : null}
      <TouchableWithoutFeedback onPress={visibleControls}>
        <Box>
          <Video
            ref={ref => (videoRef.current = ref)}
            source={{uri: videoUrl}}
            poster={getCurrentVideo?.videoData?.thumbnail}
            posterResizeMode={'cover'}
            style={fullscreen ? styles.fullscreenVideo : styles.video}
            controls={false}
            resizeMode={'contain'}
            onLoadStart={onLoadStart}
            onLoad={onLoad}
            ignoreSilentSwitch={'ignore'}
            onProgress={onProgress}
            onEnd={onEnd}
            paused={!play}
          />
          {showControls && (
            <View style={styles.controlOverlay}>
              <TouchableOpacity
                onPress={handleFullscreen}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                style={styles.fullscreenButton}>
                {fullscreen ? (
                  <Image
                    source={FullscreenClose}
                    style={{width: 15, height: 15}}
                  />
                ) : (
                  <Image
                    source={FullscreenOpen}
                    style={{width: 15, height: 15}}
                  />
                )}
              </TouchableOpacity>
              {isLoading ? (
                <>
                  {onEndingStart && nextVideoDisableTime > 0 ? (
                    <Box flex={1} alignItems={'center'}>
                      <Box flex={1} style={styles.AutoPlayTimerContainer}>
                        <HeadingText
                          color={Colors.black}
                          fontSize={fontSizes[15]}>
                          {nextVideoDisableTime}
                        </HeadingText>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      flex={1}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <ActivityIndicator size={'large'} color={Colors.white} />
                    </Box>
                  )}
                </>
              ) : (
                <PlayerControls
                  onPlay={handlePlayPause}
                  onPause={handlePlayPause}
                  playing={play}
                  showPreviousAndNext={false}
                  showSkip={true}
                  skipBackwards={skipBackward}
                  skipForwards={skipForward}
                />
              )}
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSlideStart={handlePlayPause}
                onSlideComplete={handlePlayPause}
                onSeek={onSeek}
              />
            </View>
          )}
        </Box>
      </TouchableWithoutFeedback>
    </>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    height: '100%',
    width: '100%',
  },
  backgroundVideoFullScreen: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  video: {
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width,
    backgroundColor: Colors.black,
  },
  fullscreenVideo: {
    height: Dimensions.get('window').width,
    width: OsVer != '5.1.1' ? Dimensions.get('window').height : '100%',
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 15,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
  AutoPlayTimerContainer: {
    backgroundColor: Colors.white,
    borderColor: 'rgba(65,82,106,0.5)',
    borderWidth: 10,
    borderRadius: 80 / 2,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStateToProps = ({
  app: {getVideo_PlaylistData, getCommentData, getCurrentVideo},
}) => ({
  getVideo_PlaylistData,
  getCommentData,
  getCurrentVideo,
});
export default connect(mapStateToProps, {
  getVideoPlaylistAction,
  getCommentAction,
  getCurrentVideo_Action,
})(Videoplayer);
