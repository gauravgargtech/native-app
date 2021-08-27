import React from 'react';
import Slider from '@react-native-community/slider';
import {View, Text, StyleSheet} from 'react-native';
import {Box} from '../../components';
import {Colors} from '../../theme';

const ProgressBar = ({
  currentTime,
  duration,
  onSeek,
  onSlideStart,
  onSlideComplete,
}) => {
  const position = getMinutesFromSeconds(currentTime);
  const fullDuration = getMinutesFromSeconds(duration);

  const getTimeCurrentTime = () => {
    let unix_timestamp = currentTime;
    let formattedTime;

    const hours = '0' + ~~(unix_timestamp / 3600);
    const minutes = '0' + ~~((unix_timestamp % 3600) / 60);
    const seconds = '0' + ~~(unix_timestamp % 60);
    formattedTime =
      (hours == '00' ? '' : hours + ':') +
      minutes.substr(-2) +
      ':' +
      seconds.substr(-2);

    return {formattedTime: formattedTime};
  };

  const getTimeDuration = () => {
    let unix_timestamp = duration;
    let formattedTime;
    const date = new Date(unix_timestamp * 1000);
    if (date == 'Invalid Date') {
      formattedTime = unix_timestamp;
    } else {
      const hours = '0' + ~~(unix_timestamp / 3600);
      const minutes = '0' + ~~((unix_timestamp % 3600) / 60);
      const seconds = '0' + ~~(unix_timestamp % 60);
      formattedTime =
        (hours == '00' ? '' : hours + ':') +
        minutes.substr(-2) +
        ':' +
        seconds.substr(-2);
    }
    return {formattedTime: formattedTime};
  };

  return (
    <View style={styles.wrapper}>
      <Slider
        minimumValue={0}
        disabled={true}
        maximumValue={duration}
        trackStyle={{height: 6}}
        thumbStyle={{width: 15, height: 15}}
        thumbTintColor={Colors.btnclr}
        minimumTrackTintColor={'#F44336'}
        maximumTrackTintColor={'#FFFFFF'}
        onSlidingComplete={onSeek}
        onValueChange={handleOnSlide}
        value={currentTime}
      />
      <View style={styles.timeWrapper}>
        <Text style={styles.timeLeft}>{getTimeCurrentTime()?.formattedTime}</Text>
        <Text style={styles.timeRight}>{getTimeDuration()?.formattedTime}</Text>
      </View>
    </View>
  );

  function getMinutesFromSeconds(time: number) {
    const minutes = time >= 60 ? Math.floor(time / 60) : 0;
    const seconds = Math.floor(time - minutes * 60);

    return `${minutes >= 10 ? minutes : '0' + minutes}:${
      seconds >= 10 ? seconds : '0' + seconds
    }`;
  }

  function handleOnSlide(time: number) {
    onSeek({seekTime: time});
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  timeLeft: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    paddingLeft: 10,
  },
  timeRight: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'right',
    paddingRight: 10,
  },
});

export default ProgressBar;
