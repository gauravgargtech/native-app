import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {Box, Button, PlainText, SubHeadingText} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../../theme';
import {ProfileAvtar} from '../../../assets/images';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

const VideoDeatilsPage = ({navigation, route}) => {
  const {videoItem} = route.params ?? {};
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

  const onSeek = seek => {
    videoPlayer?.current.seek(seek);
  };

  const onSeeking = currentVideoTime => setCurrentTime(currentVideoTime);

  const onPaused = (newState) => {
    setPaused(!paused);
    setPlayerState(newState);
  };

  const onReplay = () => {
    videoPlayer?.current.seek(currentTime);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  const onProgress = data => {
    setCurrentTime(Math.round(data.currentTime));
  };

  const onLoad = data => {
    setDuration(Math.round(data.duration));
  };
  const onEnd = () => {
    setCurrentTime(duration);
  };

  return (
    <Box flex={1} justifyContent={'flex-start'}>
      <Box>
        <Video
          source={{
            uri: videoItem?.url,
          }}
          ref={ref => (videoPlayer.current = ref)}
          controls={true}
          playInBackground={true}
          onLoad={onLoad}
          onProgress={onProgress}
          onEnd={onEnd}
          paused={paused}
          style={styles.backgroundVideo}
        />
        <MediaControls
          isFullScreen={false}
          duration={duration}
          progress={currentTime}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          mainColor={'red'}
          playerState={playerState}
          sliderStyle={{containerStyle: {}, thumbStyle: {}, trackStyle: {}}}
        />
      </Box>
      <Box p={ms(10)} flexDirection={'row'} alignItems={'center'}>
        <Image source={ProfileAvtar} style={styles.channelIcon} />
        <Box style={styles.videoDescriptionView}>
          <SubHeadingText
            color={Colors.black}
            numberOfLines={2}
            ellipsizeMode={'tail'}
            fontSize={fontSizes[2]}>
            {videoItem?.title} Quan that led to diving gold media
          </SubHeadingText>
          <SubHeadingText color={Colors.grey} fontSize={fontSizes[1]}>
            Entertainment
          </SubHeadingText>
          <Box flexDirection={'row'}>
            <PlainText color={Colors.grey} fontSize={fontSizes[1]}>
              {videoItem?.views}
            </PlainText>
            <PlainText color={Colors.grey} fontSize={fontSizes[1]}>
              {' . '}
            </PlainText>
            <PlainText color={Colors.grey} fontSize={fontSizes[1]}>
              {videoItem?.date_posted}
            </PlainText>
          </Box>
        </Box>
      </Box>
      <Box p={ms(20)}>
        <SubHeadingText color={Colors.black} fontSize={fontSizes[3]}>
          Video Details
        </SubHeadingText>
        <SubHeadingText color={Colors.black} fontSize={fontSizes[3]}>
          comment
        </SubHeadingText>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    height: 250,
    width: '100%',
  },
  videoDescriptionView: {
    marginLeft: 10,
    padding: ms(10),
    width: wp('70%'),
    justifyContent: 'space-evenly',
  },
  channelIcon: {
    width: wp('15%'),
    height: hp('8%'),
    borderRadius: 100 / 2,
  },
});
export default VideoDeatilsPage;
