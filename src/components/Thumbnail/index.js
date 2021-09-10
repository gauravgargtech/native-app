import React from 'react';
import {StyleSheet, Image, ImageBackground, Platform} from 'react-native';
import {Box, VideoDescription, PlainText} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms, s, vs} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../theme';
const ChannelIconUrl = imageURL => `https://kid.greatequip.com${imageURL}`;

const Thumbnail = ({videoItem, descriptionStyle, channelStyle}) => {
  return (
    <>
      <ImageBackground
        source={{
          uri: videoItem?.thumbnail,
        }}
        style={styles.thumbnailImageStyle}
        resizeMode={'contain'}>
        <Box style={styles.total_timingView}>
          <PlainText color={Colors.white}>{videoItem?.total_time}</PlainText>
        </Box>
      </ImageBackground>
      <Box style={styles.videoDescriptionMainContainer}>
        <Image
          source={{uri: ChannelIconUrl(videoItem?.channel_icon)}}
          style={[styles.channelIcon, channelStyle]}
          resizeMode={'contain'}
        />
        <Box style={[styles.videoDescriptionView, descriptionStyle]}>
          <VideoDescription videoItem={videoItem} />
        </Box>
      </Box>
    </>
  );
};
const styles = StyleSheet.create({
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
    right: Platform.OS === 'ios' ? '13%' : ms(40),
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
  videoDescriptionView: {
    marginLeft: 10,
    padding: ms(10),
    width: Platform.OS === 'ios' ? '65%' : '70%',
    justifyContent: 'space-evenly',
  },
  channelIcon: {
    width: wp('16%'),
    height: hp('8%'),
    borderRadius: 90 / 2,
  },
});
export default Thumbnail;
