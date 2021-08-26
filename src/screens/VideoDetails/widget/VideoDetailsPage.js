import React, {useEffect, useRef, useState} from 'react';
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
} from 'react-native';
import {
  Box,
  Button,
  VideoDescription,
  PlainText,
  SubHeadingText,
  Loader,
  PlayerControls,
  ProgressBar,
} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms, vs, s} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../../theme';
import {ProfileAvtar} from '../../../assets/images';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {connect} from 'react-redux';
import {FullscreenClose, FullscreenOpen} from '../../../assets/icons';

const VideoDeatilsPage = ({navigation, route, getVideo_PlaylistData}) => {
  const {videoItem} = route.params ?? {};
  const videoRef = useRef(null);
  const [state, setState] = useState({
    fullscreen: false,
    play: false,
    currentTime: 0,
    duration: 0,
    showControls: true,
  });

  function onEnd() {
    setState({...state, play: false});
    videoRef.current.seek(0);
  }

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);

    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);

  function handleOrientation(orientation) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? setState(s => ({...s, fullscreen: true}))
      : setState(s => ({...s, fullscreen: false}));
  }

  function onLoadEnd(data) {
    console.log('load end::', data);
    setState(s => ({
      ...s,
      duration: data.duration,
      currentTime: data.currentTime,
    }));
  }

  function onProgress(data) {
    setState(s => ({
      ...s,
      currentTime: data.currentTime,
    }));
  }

  function handleFullscreen() {
    state.fullscreen
      ? Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft();
  }
  function handlePlayPause() {
    // If playing, pause and show controls immediately.
    if (state.play) {
      setState({...state, play: false, showControls: true});
      return;
    }

    setState({...state, play: true});
    setTimeout(() => setState(s => ({...s, showControls: false})), 2000);
  }

  function skipBackward() {
    videoRef.current.seek(state.currentTime - 15);
    setState({...state, currentTime: state.currentTime - 15});
  }

  function skipForward() {
    videoRef.current.seek(state.currentTime + 15);
    setState({...state, currentTime: state.currentTime + 15});
  }

  function onSeek(data) {
    videoRef.current.seek(data.seekTime);
    setState({...state, currentTime: data.seekTime});
  }

  return (
    <Box flex={1}>
      <Box height={hp('30%')} style={{marginHorizontal: isFullScreen ? 50 : 0}}>
        <Video
          ref={videoRef}
          source={{
            uri: videoItem?.url,
          }}
          style={state.fullscreen ? styles.fullscreenVideo : styles.video}
          controls={false}
          resizeMode={'contain'}
          onLoad={onLoadEnd}
          onProgress={onProgress}
          onEnd={onEnd}
          paused={!state.play}
        />
        {state.showControls && (
          <View style={styles.controlOverlay}>
            <TouchableOpacity
              onPress={handleFullscreen}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              style={styles.fullscreenButton}>
              <Text>{state.fullscreen ? 'close' : 'open'}</Text>
            </TouchableOpacity>
            <PlayerControls
              onPlay={handlePlayPause}
              onPause={handlePlayPause}
              playing={state.play}
              showPreviousAndNext={false}
              showSkip={true}
              skipBackwards={skipBackward}
              skipForwards={skipForward}
            />
            <ProgressBar
              currentTime={state.currentTime}
              duration={state.duration > 0 ? state.duration : 0}
              onSlideStart={handlePlayPause}
              onSlideComplete={handlePlayPause}
              onSlideCapture={onSeek}
            />
          </View>
        )}
        {/*/>*/}
        {/*<MediaControls*/}
        {/*  isFullScreen={isFullScreen}*/}
        {/*  onFullScreen={onFullScreen}*/}
        {/*  duration={duration}*/}
        {/*  progress={currentTime}*/}
        {/*  onPaused={onPaused}*/}
        {/*  onReplay={onReplay}*/}
        {/*  onSeek={onSeek}*/}
        {/*  onSeeking={onSeeking}*/}
        {/*  mainColor={'red'}*/}
        {/*  playerState={playerState}*/}
        {/*  style={*/}
        {/*    isFullScreen*/}
        {/*      ? styles.backgroundVideoFullScreen*/}
        {/*      : styles.backgroundVideo*/}
        {/*  }*/}
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
            {getVideo_PlaylistData?.playList?.map(playlistItem => {
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
    height: '100%',
    width: '100%',
  },
  backgroundVideoFullScreen: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
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
    right: Platform.OS === 'ios' ? '13%' : '10%',
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
    paddingRight: 10,
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
const mapStateToProps = ({app: {getVideo_PlaylistData}}) => ({
  getVideo_PlaylistData,
});
export default connect(mapStateToProps, {})(VideoDeatilsPage);
