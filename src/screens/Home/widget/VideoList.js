import React, {useEffect} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
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
import {ms} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../../theme';
import {getVideoListAction} from '../../../store/actions';
import {connect} from 'react-redux';
import {ProfileAvtar} from '../../../assets/images';
import {VIDEO_DETAILS} from '../../../navigator/routes';

const VideoList = ({navigation, getVideoListAction, getVideoList}) => {
  useEffect(() => {
    getVideoListAction();
  }, []);
  return (
    <Box flex={1.8} justifyContent={'flex-start'}>
      <Box p={ms(5)}>
        {getVideoList.map(videoItem => {
          return (
            <Box>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(VIDEO_DETAILS, {
                    videoItem: videoItem,
                  })
                }>
                <Image
                  source={{
                    uri: videoItem?.thumbnail,
                  }}
                  style={styles.thumbnailImageStyle}
                  resizeMode={'contain'}
                />
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
    width: wp('90%'),
    height: hp('18%'),
    borderRadius: 3,
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
    width: wp('60%'),
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
export default connect(mapStateToProps, {getVideoListAction})(VideoList);
