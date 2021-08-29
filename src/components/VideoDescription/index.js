import React from 'react';
import {Box, PlainText, SubHeadingText} from '../../components';
import {ms} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../theme';

const VideoDescription = ({videoItem}) => {
  return (
    <>
      <SubHeadingText
        numberOfLines={2}
        ellipsizeMode={'tail'}
        fontSize={fontSizes[1.5]}>
        {videoItem?.title}
      </SubHeadingText>
      <SubHeadingText
        color={Colors.grey}
        fontSize={fontSizes[1]}
        style={{paddingVertical: ms(3)}}>
        {videoItem?.video_type}
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
    </>
  );
};
export default VideoDescription;
