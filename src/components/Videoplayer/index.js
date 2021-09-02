import React, {useEffect, useRef, useState} from 'react';
import {Box, PlayerControls, ProgressBar} from '../../components';
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
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import {FullscreenClose, FullscreenOpen} from '../../assets/icons';
import Orientation from 'react-native-orientation-locker';
import {
  getVideoPlaylistAction,
  getCommentAction,
  getCurrentVideo_Action,
  getCurrentTime_Action,
} from '../../store/actions';
import {connect} from 'react-redux';
import moment from 'moment';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Videoplayer = ({
  getVideoPlaylistAction,
  getVideo_PlaylistData,
  getCommentAction,
  getCommentData,
  getCurrentVideo_Action,
  getCurrentVideo,
  getCurrentTime_Action,
  getCurrentVideoTime,
}) => {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(
    getCurrentVideo?.videoData?.total_time,
  );
  const [fullscreen, setFullscreen] = useState(false);
  const [play, setPlay] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const videoUrl = getCurrentVideo?.videoData?.url;

  const onEnd = () => {
    console.log('Duration', duration);
    getCurrentVideoTime.currentTime[0].currentTime = duration;
    const updateTime = getCurrentVideoTime?.currentTime?.map(item => {
      return {...item};
    });
    getCurrentTime_Action({...getCurrentVideoTime, currentTime: updateTime});

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
    const currentTime = 0;
    try {
      if (nextOne[0] != undefined) {
        const getPlayerVideo = {
          videoData: nextOne[0],
        };
        const getPlayerVideoTime = {
          currentTime: [{currentTime: currentTime}],
        };
        getCurrentVideo_Action(getPlayerVideo);
        getCurrentTime_Action(getPlayerVideoTime);

        getCommentAction(getCurrentVideo?.videoData?.id);
        getVideoPlaylistAction(getCurrentVideo?.videoData?.id);
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
      setDuration(Math.floor(total_duration));
    } else {
      const total_duration = moment
        .duration(`${a[0]}:${a[1]}:${a[2]}`)
        .asSeconds();
      setDuration(Math.floor(total_duration));
    }
    // videoRef?.current?.presentFullscreenPlayer();
  };

  const onProgress = data => {
    getCurrentVideoTime.currentTime[0].currentTime = Math.round(
      data.currentTime,
    );
    const updateTime = getCurrentVideoTime?.currentTime?.map(item => {
      return {...item};
    });
    getCurrentTime_Action({...getCurrentVideoTime, currentTime: updateTime});
    // setState(s => ({
    //   ...s,
    //   currentTime: data.currentTime,
    // }));
  };

  function handleFullscreen() {
    if (Platform.OS == 'ios') {
      videoRef?.current?.presentFullscreenPlayer();
    } else {
      fullscreen
        ? Orientation.unlockAllOrientations()
        : Orientation.lockToLandscapeLeft();
    }
  }
  function handlePlayPause() {
    // If playing, pause and show controls immediately.
    if (play) {
      // setState({...state, play: false, showControls: true});
      setPlay(false);
      setShowControls(true);
      return;
    }

    // setState({...state, play: true});
    setPlay(true);
    setTimeout(() => setShowControls(false), 2000);
  }

  const skipBackward = () => {
    videoRef.current.seek(
      getCurrentVideoTime?.currentTime[0]?.currentTime - 10,
    );
    getCurrentVideoTime.currentTime[0].currentTime = Math.round(
      getCurrentVideoTime?.currentTime[0]?.currentTime - 10,
    );
    const updateTime = getCurrentVideoTime?.currentTime?.map(item => {
      return {...item};
    });
    getCurrentTime_Action({...getCurrentVideoTime, currentTime: updateTime});
    // videoRef.current.seek(state.currentTime - 10);
    // setState({...state, currentTime: state.currentTime - 10});
  };

  const skipForward = () => {
    videoRef.current.seek(
      getCurrentVideoTime?.currentTime[0]?.currentTime + 10,
    );
    getCurrentVideoTime.currentTime[0].currentTime = Math.round(
      getCurrentVideoTime?.currentTime[0]?.currentTime + 10,
    );
    const updateTime = getCurrentVideoTime?.currentTime?.map(item => {
      return {...item};
    });
    getCurrentTime_Action({...getCurrentVideoTime, currentTime: updateTime});
    // videoRef.current.seek(state.currentTime + 10);
    // setState({...state, currentTime: state.currentTime + 10});
  };

  const onSeek = (seek: OnSeekData) => {
    videoRef?.current.seek(seek);
    getCurrentVideoTime.currentTime[0].currentTime = Math.round(seek);
    const updateTime = getCurrentVideoTime?.currentTime?.map(item => {
      return {...item};
    });
    getCurrentTime_Action({...getCurrentVideoTime, currentTime: updateTime});
    console.log(
      'on slide seek time ::',
      getCurrentVideoTime?.currentTime[0]?.currentTime,
    );
    // videoRef.current.seek(data.seekTime);
    // setState({...state, currentTime: data.seekTime});
  };
  const onSeeking = currentVideoTime =>
    getCurrentTime_Action({
      ...getCurrentVideoTime,
      currentTime: currentVideoTime,
    });

  function visibleControls() {
    showControls ? setShowControls(false) : setShowControls(true);
  }

  const getSliderValue = () => {
    let slider;
    getCurrentVideoTime?.currentTime?.map(item => {
      slider = item.currentTime;
    });
    return {slider: slider};
  };
  return (
    <TouchableWithoutFeedback onPress={showControls}>
      <Box height={fullscreen ? hp('51%') : hp('30%')}>
        <Video
          ref={ref => (videoRef.current = ref)}
          source={{
            uri: videoUrl,
          }}
          style={fullscreen ? styles.fullscreenVideo : styles.backgroundVideo}
          controls={false}
          resizeMode={'contain'}
          onLoad={onLoad}
          onProgress={onProgress}
          onEnd={onEnd}
          paused={!play}
        />
        {console.log('Full screen', fullscreen)}
        {visibleControls && (
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
              currentTime={getSliderValue()?.slider}
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
  app: {
    getVideo_PlaylistData,
    getCommentData,
    getCurrentVideo,
    getCurrentVideoTime,
  },
}) => ({
  getVideo_PlaylistData,
  getCommentData,
  getCurrentVideo,
  getCurrentVideoTime,
});
export default connect(mapStateToProps, {
  getVideoPlaylistAction,
  getCommentAction,
  getCurrentVideo_Action,
  getCurrentTime_Action,
})(Videoplayer);
