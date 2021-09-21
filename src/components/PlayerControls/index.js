import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {VideoPause, VideoPlay, Backward, Forward} from '../../assets/icons';

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
          {/*<SubHeadingText color={Colors.white}>skipBack</SubHeadingText>*/}
          <Image source={Backward} style={{width: 25, height: 25}} />
        </TouchableOpacity>
      )}
      {/*{showSkip && (*/}
      {/*  <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>*/}
      {/*    <VideoSkipBack />*/}
      {/*  </TouchableOpacity>*/}
      {/*)}*/}

      <TouchableOpacity
        style={styles.touchable}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPress={playing ? onPause : onPlay}>
        {/*<SubHeadingText color={'white'}>{playing ? 'Pause' : 'Play'}</SubHeadingText>*/}
        {playing ? (
          <Image source={VideoPause} style={{width: 15, height: 15}} />
        ) : (
          <Image source={VideoPlay} style={{width: 15, height: 15}} />
        )}
      </TouchableOpacity>

      {showSkip && (
        <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
          {/*<VideoSkipForward />*/}
          {/*<SubHeadingText color={Colors.white}>Forward</SubHeadingText>*/}
          <Image source={Forward} style={{width: 25, height: 25}} />
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
