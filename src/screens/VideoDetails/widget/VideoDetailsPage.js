import React, {useEffect, useRef, useState, useCallback} from 'react';
import {ScrollView, StyleSheet, Image, View, Alert} from 'react-native';
import {Box, Button, PlainText, SubHeadingText} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../../theme';
import {ProfileAvtar} from '../../../assets/images';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoDeatilsPage = ({navigation, route}) => {
  const {getVideoDetailsData} = route.params ?? {};
  const {title, thumbnail, url, oggUrl, views, total_time, date_posted} =
    getVideoDetailsData;

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <Box flex={1} justifyContent={'flex-start'}>
      <YoutubePlayer
        height={220}
        play={playing}
        videoId={'iee2TATGMyI'}
        onChangeState={onStateChange}
      />
      <Box p={ms(10)} flexDirection={'row'} alignItems={'center'}>
        <Image source={ProfileAvtar} style={styles.channelIcon} />
        <Box style={styles.videoDescriptionView}>
          <SubHeadingText
            color={Colors.black}
            numberOfLines={2}
            ellipsizeMode={'tail'}
            fontSize={fontSizes[2]}>
            {title} Quan that led to diving gold media
          </SubHeadingText>
          <SubHeadingText color={Colors.grey} fontSize={fontSizes[1]}>
            Entertainment
          </SubHeadingText>
          <Box flexDirection={'row'}>
            <PlainText color={Colors.grey} fontSize={fontSizes[1]}>
              {views}
            </PlainText>
            <PlainText color={Colors.grey} fontSize={fontSizes[1]}>
              {' . '}
            </PlainText>
            <PlainText color={Colors.grey} fontSize={fontSizes[1]}>
              {date_posted}
            </PlainText>
          </Box>
        </Box>
      </Box>
      <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
      <Box p={ms(20)}>
        <SubHeadingText color={Colors.black} fontSize={fontSizes[3]}>
          Video Details
        </SubHeadingText>
        <SubHeadingText color={Colors.black} fontSize={fontSizes[3]}>
          {url}
        </SubHeadingText>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
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
