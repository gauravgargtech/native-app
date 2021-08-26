import React, {useEffect} from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Box,
  VideoDescription,
  SubHeadingText,
  PlainText,
} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms, s, vs} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../../theme';
import {connect} from 'react-redux';
import {ProfileAvtar} from '../../../assets/images';
import {VIDEO_DETAILS} from '../../../navigator/routes';

const VideoList = ({navigation, getVideoList}) => {
  return (
    <Box
      flex={0.9}
      justifyContent={'flex-start'}
      style={{paddingHorizontal: ms(10)}}>
      <Box p={ms(5)}>
        {getVideoList.map((videoItem, index) => {
          return (
            <Box>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(VIDEO_DETAILS, {
                    videoItem: videoItem,
                  })
                }>
                <ImageBackground
                  source={{
                    uri: videoItem?.thumbnail,
                  }}
                  style={styles.thumbnailImageStyle}
                  resizeMode={'contain'}>
                  <Box style={styles.total_timingView}>
                    <PlainText color={Colors.white}>
                      {videoItem?.total_time}
                    </PlainText>
                  </Box>
                </ImageBackground>
                <Box style={styles.videoDescriptionMainContainer}>
                  <Image
                    source={ProfileAvtar}
                    style={styles.channelIcon}
                    resizeMode={'contain'}
                  />
                  <Box style={styles.videoDescriptionView}>
                    <VideoDescription videoItem={videoItem} />
                  </Box>
                </Box>
              </TouchableOpacity>
            </Box>
          );
        })}
      </Box>
    </Box>
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
    right: Platform.OS === 'ios' ? '13%' : wp('9.8%'),
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
const mapStateToProps = ({app: {getVideoList}}) => ({
  getVideoList,
});
export default connect(mapStateToProps, {})(VideoList);
