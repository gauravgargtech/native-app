import React, {useEffect} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {Box, HeadingText, SubHeadingText,PlainText} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../../theme';
import {getVideoDetailsAction} from '../../../store/actions';
import {connect} from 'react-redux';
import {ProfileAvtar} from '../../../assets/images';
import {VIDEO_DETAILS} from '../../../navigator/routes';

const VideoList = ({
  navigation,
  getVideoDetailsAction,
  getVideoDetailsData,
}) => {
  useEffect(() => {
    getVideoDetailsAction();
  }, []);

  console.log('Image', getVideoDetailsData);
  const {title, thumbnail, url, oggUrl, views, total_time, date_posted} =
    getVideoDetailsData;
  return (
    <Box flex={1.8} p={ms(15)} justifyContent={'flex-start'}>
      <Box p={ms(10)}>
        <TouchableOpacity onPress={() => navigation.navigate(VIDEO_DETAILS,{getVideoDetailsData:getVideoDetailsData})}>
          <Image
            source={{
              uri: thumbnail,
            }}
            style={{width: wp('82%'), height: hp('18%'), borderRadius: 3}}
            resizeMode={'stretch'}
          />
        </TouchableOpacity>
        <Box flexDirection={'row'} alignItems={'center'}>
          <Image source={ProfileAvtar} style={styles.channelIcon} />
          <TouchableOpacity onPress={() => navigation.navigate(VIDEO_DETAILS,{getVideoDetailsData:getVideoDetailsData})}>
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
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  videoDescriptionView: {
    marginLeft: 10,
    padding: ms(10),
    width: wp('69%'),
    justifyContent: 'space-evenly',
  },
  channelIcon: {
    width: wp('15%'),
    height: hp('8%'),
    borderRadius: 100 / 2,
  },
});
const mapStateToProps = ({app: {getVideoDetailsData}}) => ({
  getVideoDetailsData,
});
export default connect(mapStateToProps, {getVideoDetailsAction})(VideoList);
