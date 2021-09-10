import React from 'react';
import Slider from '@react-native-community/slider';
// import Slider from 'react-native-slider';
import {View, Text, StyleSheet} from 'react-native';
import {Box} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../theme';

interface Props {
  currentTime: number;
  duration: number;
  onSeek: () => void;
  onSlideCapture: (data: {seekTime: number}) => void;
  onSlideStart: () => void;
  onSlideComplete: () => void;
}

const ProgressBar: React.FC<Props> = ({
  currentTime,
  duration,
  onSeek,
  onSlideStart,
  onSlideComplete,
}) => {
  const position = getMinutesFromSeconds(currentTime);
  const fullDuration = getMinutesFromSeconds(duration);
  console.log('Progress bar Current time', currentTime);
  console.log('Progress bar Duration time', duration);
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
        maximumValue={duration}
        style={{height: '40%'}}
        // trackStyle={{height: 5}}
        // thumbStyle={{width: 15, height: 15}}
        tapToSeek={true}
        thumbTintColor={Colors.btnclr}
        minimumTrackTintColor={'#F44336'}
        maximumTrackTintColor={'#FFFFFF'}
        onSlidingComplete={onSeek}
        value={currentTime}
      />
      <View style={styles.timeWrapper}>
        <Text style={styles.timeLeft}>
          {getTimeCurrentTime()?.formattedTime}
        </Text>
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
    console.log('on slide cureent time ::', currentTime);
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
  },
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 50,
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
