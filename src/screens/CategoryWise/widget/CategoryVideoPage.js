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
  Thumbnail,
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
// import {
//   getCurrentVideo_Action,
//   getCurrentTime_Action,
//   getCommentAction,
//   getVideoPlaylistAction,
// } from '../../../store/actions';
import {connect} from 'react-redux';
import {ProfileAvtar} from '../../../assets/images';
import {VIDEO_DETAILS} from '../../../navigator/routes';
const ChannelIconUrl = imageURL => `https://kid.greatequip.com${imageURL}`;

const CategoryVideoPage = ({navigation, getCategoryDataList}) => {
  // const currentTime = 0;
  // const onClickVideo = async ({videoItem}) => {
  //   navigation.navigate(VIDEO_DETAILS, {
  //     videoItem: videoItem,
  //   });
  //
  //   try {
  //     const getPlayerVideo = {
  //       videoData: videoItem,
  //     };
  //     const getPlayerVideoTime = {
  //       currentTime: [{currentTime: currentTime}],
  //     };
  //     await getCurrentVideo_Action(getPlayerVideo);
  //     await getCurrentTime_Action(getPlayerVideoTime);
  //
  //     await getCommentAction(getCurrentVideo?.videoData?.id);
  //     await getVideoPlaylistAction(getCurrentVideo?.videoData?.id);
  //   } catch (e) {
  //     console.log('ERRORS AT GET_VIDEO_DATA', e);
  //   }
  // };
  return (
    <Box
      flex={0.9}
      justifyContent={'flex-start'}
      style={{paddingHorizontal: ms(10)}}>
      <Box p={ms(5)}>
        {getCategoryDataList.map((videoItem, index) => {
          return (
            <Box>
              <TouchableOpacity onPress={() => console.log('Category Clicked')}>
                <Thumbnail videoItem={videoItem} />
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
const mapStateToProps = ({app: {getCategoryDataList}}) => ({
    getCategoryDataList,
});
export default connect(mapStateToProps, {})(CategoryVideoPage);
