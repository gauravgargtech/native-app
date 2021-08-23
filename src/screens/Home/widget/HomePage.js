import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Box, SubHeadingText, PlainText} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms, s} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../../theme';
import {getTagsAction} from '../../../store/actions';
import {connect} from 'react-redux';
import {borderRadius} from 'styled-system';
const HomePage = ({navigation, getTagsAction, getTagsData}) => {
  useEffect(() => {
    getTagsAction();
  }, []);
  console.log('get Tags Data', getTagsData);
  return (
    <Box flex={0.1} justifyContent={'flex-start'}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Box height={hp('6%')} flexDirection={'row'}>
          {getTagsData.map(tagsItem => {
            return (
              <Box
                style={[
                  styles.tagView,
                  {
                    backgroundColor:
                      tagsItem.text == 'ALL'
                        ? Colors.blackColor
                        : Colors.greyBox,
                  },
                ]}>
                <PlainText
                  color={
                    tagsItem.text == 'ALL' ? Colors.white : Colors.blackColor
                  }
                  fontSize={fontSizes[2]}>
                  {tagsItem.text}
                </PlainText>
              </Box>
            );
          })}
        </Box>
      </ScrollView>
    </Box>
  );
};
const styles = StyleSheet.create({
  tagView: {
    height: hp('4%'),
    borderRadius: 30,
    padding: ms(8),
    margin: ms(5),
  },
});
const mapStateToProps = ({app: {getTagsData}}) => ({getTagsData});
export default connect(mapStateToProps, {getTagsAction})(HomePage);
