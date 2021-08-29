import React from 'react';
import {Box, HeadingText, SubHeadingText} from '../../components';
import {ms, s, vs} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../theme';
import {Image, Platform, StyleSheet} from 'react-native';
import {ProfileAvtar} from '../../assets/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CommentList = ({commentList}) => {
  return (
    <Box
      flexDirection={'row'}
      style={{paddingVertical: 8}}
      alignItems={'center'}>
      <Box>
        <Image source={ProfileAvtar} style={styles.channelIcon} />
      </Box>
      <Box ml={ms(10)} width={wp('70%')}>
        <HeadingText fontSize={fontSizes[3]} style={{paddingVertical: 3}}>
          {commentList?.name}
        </HeadingText>
        <SubHeadingText
          numberOfLines={2}
          fontSize={fontSizes[2]}
          style={{paddingVertical: 3}}>
          {commentList?.comment}
        </SubHeadingText>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  channelIcon: {
    width: wp('15%'),
    height: hp('8%'),
    borderRadius: 100 / 2,
  },
});
export default CommentList;
