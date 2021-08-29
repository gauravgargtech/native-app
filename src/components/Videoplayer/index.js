import React from 'react';
import {Box, PlayerControls, ProgressBar} from '../../components';
import {
  Dimensions,
  Image,
  Platform,
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

const Videoplayer = ({
  showControls,
  videoRef,
  videoItem,
  fullscreen,
  onLoad,
  onProgress,
  onEnd,
  play,
  visibleControl,
  handleFullscreen,
  handlePlayPause,
  skipBackward,
  skipForward,
  currentTime,
  duration,
  onSeek,
  onSeeking,
}) => {
  return (
    <TouchableWithoutFeedback onPress={showControls}>
      <Box>
        <Video
          ref={ref => (videoRef.current = ref)}
          source={{
            uri: videoItem?.url,
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
        {visibleControl && (
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
export default Videoplayer;
