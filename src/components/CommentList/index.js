import React from 'react';
import {Box, HeadingText, SubHeadingText, PlainText} from '../../components';
import {ms, s, vs} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../theme';
import {Image, Platform, StyleSheet} from 'react-native';
import {ProfileAvtar} from '../../assets/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const UserIconUrl = imageURL => `https://kid.greatequip.com${imageURL}`;

const CommentList = ({commentList}) => {
  return (
    <Box
      flexDirection={'row'}
      style={{paddingVertical: 8}}
      alignItems={'center'}>
      <Box>
        <Image
          source={{uri: UserIconUrl(commentList?.user_profile_icon)}}
          style={styles.DetailsChannelIcon}
        />
      </Box>
      <Box ml={ms(10)} width={wp('70%')}>
        <HeadingText fontSize={fontSizes[3]} style={{paddingVertical: 3}}>
          {commentList?.name} .{'\t'}
          <PlainText fontSize={fontSizes[2]} style={{paddingVertical: 3}}>
            {commentList?.posted_time}
          </PlainText>
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
  DetailsChannelIcon: {
    width: wp('16%'),
    height: hp('7%'),
    borderRadius: 90 / 2,
  },
});
export default CommentList;
