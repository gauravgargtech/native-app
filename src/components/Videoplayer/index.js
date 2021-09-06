import React, {useEffect, useRef, useState} from 'react';
import {Box, CustomHeader, PlayerControls, ProgressBar} from '../../components';
import {
  Alert,
  Dimensions,
  Image,
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
  // getCurrentTime_Action,
} from '../../store/actions';
import {connect} from 'react-redux';
import moment from 'moment';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Videoplayer = ({
  navigation,
  getVideoPlaylistAction,
  getVideo_PlaylistData,
  getCommentAction,
  getCommentData,
  getCurrentVideo_Action,
  getCurrentVideo,
  // getCurrentTime_Action,
  // getCurrentVideoTime,
}) => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [play, setPlay] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const videoUrl = getCurrentVideo?.videoData?.url;
  console.log('video url:', videoUrl);

  const onEnd = () => {
    setCurrentTime(duration);
    const allNext = getVideo_PlaylistData?.playList?.map(
      (all, index, element) => {
        const current = getVideo_PlaylistData?.playList?.filter(
          PlaylistItem => {
            if (PlaylistItem?.title === getCurrentVideo?.videoData?.title) {
              return PlaylistItem;
            }
          },
        );
        if (all?.title === current[0]?.title) {
          return element[index + 1];
        }
      },
    );

    const nextOne = allNext?.filter(item => {
      if (item !== undefined) {
        return item;
      }
    });
    try {
      if (nextOne[0] != undefined) {
        const getPlayerVideo = {
          videoData: nextOne[0],
        };
        getCurrentVideo_Action(getPlayerVideo);

        getCommentAction(nextOne[0]?.id);
        getVideoPlaylistAction(nextOne[0]?.id);
      } else {
        Alert.alert('No Available Next Episodes.');
      }
    } catch (e) {
      console.log('ERRORS AT GET_NEXT_VIDEO_DATA', e);
    }

    // setState({...state, play: false});
    // videoRef.current.seek(0);
  };

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);

    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);

  function handleOrientation(orientation: string) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (setFullscreen(true), StatusBar.setHidden(true))
      : (setFullscreen(false), StatusBar.setHidden(false));
  }

  const onLoad = (data: OnLoadData) => {
    const hms = getCurrentVideo?.videoData?.total_time;
    const a = hms.split('.');

    if (a.length == 2) {
      const total_duration = moment.duration(`00:${a[0]}:${a[1]}`).asSeconds();
      setDuration(Math.round(total_duration));
    } else {
      const total_duration = moment
        .duration(`${a[0]}:${a[1]}:${a[2]}`)
        .asSeconds();
      setDuration(Math.round(total_duration));
    }
    console.log('Duration type', typeof duration);
    // setDuration(Math.round(data.duration));
    // videoRef?.current?.presentFullscreenPlayer();
  };

  const onProgress = data => {
    setCurrentTime(Math.round(data.currentTime));
    console.log('Cureent time process time', currentTime);
    console.log('Duration time on Progess', duration);
  };

  const handleFullscreen = () => {
    if (Platform.OS == 'ios') {
      videoRef?.current?.presentFullscreenPlayer();
    } else {
      fullscreen
        ? Orientation.unlockAllOrientations()
        : Orientation.lockToLandscapeLeft();
    }
  };
  const handlePlayPause = () => {
    if (play) {
      // setState({...state, play: false, showControls: true});
      setPlay(false);
      setShowControls(true);
      return;
    }

    // setState({...state, play: true});
    setPlay(true);
    setTimeout(() => setShowControls(false), 2000);
  };

  const skipBackward = () => {
    videoRef?.current.seek(currentTime - 10);
  };

  const skipForward = () => {
    videoRef?.current.seek(currentTime + 10);
  };

  const onSeek = (seek: OnSeekData) => {
    videoRef?.current.seek(seek);
  };
  const onSeeking = currentVideoTime => {
    setCurrentTime(currentVideoTime);
  };
  const visibleControls = () => {
    showControls ? setShowControls(false) : setShowControls(true);
  };
  return (
    <>
      {!fullscreen ? (
        <CustomHeader navigation={navigation} headerName={'LearnReadApp'} />
      ) : null}
      <TouchableWithoutFeedback onPress={visibleControls}>
        <Box height={fullscreen ? hp('51%') : hp('30%')}>
          <Video
            ref={ref => (videoRef.current = ref)}
            source={{
              uri: videoUrl,
            }}
            poster={getCurrentVideo?.videoData?.thumbnail}
            style={fullscreen ? styles.fullscreenVideo : styles.backgroundVideo}
            controls={false}
            resizeMode={'contain'}
            onLoad={onLoad}
            onError={e => console.log('error::', e)}
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
              <PlayerControls
                onPlay={handlePlayPause}
                onPause={handlePlayPause}
                playing={play}
                showPreviousAndNext={false}
                showSkip={true}
                skipBackwards={skipBackward}
                skipForwards={skipForward}
              />
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSlideStart={handlePlayPause}
                onSlideComplete={handlePlayPause}
                onSeek={onSeek}
                onSeeking={onSeeking}
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
    backgroundColor: 'black',
  },
  fullscreenVideo: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
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
