import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {SubHeadingText} from '../../components';
import {
  VideoSkipBack,
  VideoPrevious,
  VideoPause,
  VideoPlay,
  VideoNext,
  VideoSkipForward,
} from '../../assets/icons';
import {Box} from '../../components';
import {Colors} from '../../theme';

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
          <SubHeadingText color={Colors.white}>skipBack</SubHeadingText>
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
          <SubHeadingText color={Colors.white}>Forward</SubHeadingText>
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
