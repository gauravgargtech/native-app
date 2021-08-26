import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {
  VideoSkipBack,
  VideoPrevious,
  VideoPause,
  VideoPlay,
  VideoNext,
  VideoSkipForward,
} from '../../assets/icons';

const PlayerControls = ({
  playing,
  showPreviousAndNext,
  showSkip,
  previousDisabled,
  nextDisabled,
  onPlay,
  onPause,
  skipForwards,
  skipBackwards,
  onNext,
  onPrevious,
}) => {
  console.log(
    'showSkip::',
    showSkip,
    'showPreviousAndNext',
    showPreviousAndNext,
  );
  return (
    <View style={styles.wrapper}>
      {showPreviousAndNext && (
        <TouchableOpacity
          style={[
            styles.touchable,
            previousDisabled && styles.touchableDisabled,
          ]}
          onPress={onPrevious}
          disabled={previousDisabled}>
          {/*<VideoPrevious />*/}
          <Text>previous</Text>
        </TouchableOpacity>
      )}

      {showSkip && (
        <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
          {/*<VideoSkipBack />*/}
          <Text>skipBack</Text>
        </TouchableOpacity>
      )}
      {/*{showSkip && (*/}
      {/*  <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>*/}
      {/*    <VideoSkipBack />*/}
      {/*  </TouchableOpacity>*/}
      {/*)}*/}

      <TouchableOpacity
        style={styles.touchable}
        onPress={playing ? onPause : onPlay}>
        <Text>{playing ? 'Pause' : 'Play'}</Text>
        {/*{playing ? <VideoPause /> : <VideoPlay />}*/}
      </TouchableOpacity>

      {showSkip && (
        <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
          {/*<VideoSkipForward />*/}
          <Text>Forward</Text>
        </TouchableOpacity>
      )}

      {showPreviousAndNext && (
        <TouchableOpacity
          style={[styles.touchable, nextDisabled && styles.touchableDisabled]}
          onPress={onNext}
          disabled={nextDisabled}>
          {/*<VideoNext />*/}
          <Text>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 3,
  },
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
});

export default PlayerControls;
