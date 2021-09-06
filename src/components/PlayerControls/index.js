import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {
  VideoSkipBack,
  VideoPrevious,
  VideoPause,
  VideoPlay,
  Backward,
  Forward,
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
  // const doubleTapRefBackward = React.createRef();
  // const doubleTapRefForward = React.createRef();
  // const pressedBackward = useSharedValue(false);
  // const pressedForward = useSharedValue(false);
  //
  // const eventHandlerBackward = useAnimatedGestureHandler({
  //   onStart: (event, ctx) => {
  //     pressedBackward.value = true;
  //   },
  //   onEnd: (event, ctx) => {
  //     pressedBackward.value = false;
  //   },
  // });
  // const gestureHandleBackward = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: pressedBackward.value ? '#FEEF86' : '#001972',
  //     transform: [{scale: pressedBackward.value ? 1.2 : 1}],
  //   };
  // });
  //
  // const eventHandlerForward = useAnimatedGestureHandler({
  //   onStart: (event, ctx) => {
  //     pressedForward.value = true;
  //   },
  //   onEnd: (event, ctx) => {
  //     pressedForward.value = false;
  //   },
  // });
  // const gestureHandleForward = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: pressedForward.value ? '#FEEF86' : '#001972',
  //     transform: [{scale: pressedForward.value ? 1.2 : 1}],
  //   };
  // });
  //
  // const onForwardState = event => {
  //   if (event.nativeEvent.state === State.ACTIVE) {
  //     alert('Hey single tap!');
  //   }
  // };

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
          {/*// <TapGestureHandler*/}
          {/*//   ref={doubleTapRefBackward}*/}
          {/*//   numberOfTaps={2}*/}
          {/*//   onGestureEvent={eventHandlerBackward}*/}
          {/*//   onHandlerStateChange={skipBackwards}>*/}
          {/*//   <Animated.View style={[styles.touchable, gestureHandleBackward]}>*/}
          {/*//     <Image source={Backward} style={{width: 25, height: 25}} />*/}
          {/*//   </Animated.View>*/}
          {/*// </TapGestureHandler>*/}
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
          {/*// <TapGestureHandler*/}
          {/*//   waitFor={doubleTapRefForward}*/}
          {/*//   numberOfTaps={2}*/}
          {/*//   onGestureEvent={eventHandlerForward}*/}
          {/*//   onHandlerStateChange={onForwardState}>*/}
          {/*//   <Animated.View style={[styles.touchable, gestureHandleForward]}>*/}
          {/*//     <Image source={Forward} style={{width: 25, height: 25}} />*/}
          {/*//   </Animated.View>*/}
          {/*// </TapGestureHandler>*/}
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
