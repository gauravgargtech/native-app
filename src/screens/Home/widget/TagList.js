import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Box, PlainText} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms, s, vs} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../../theme';
import {connect} from 'react-redux';
const TagList = ({navigation, getTagsData}) => {
  const [selected, setSelected] = useState('ALL');

  return (
    <Box flex={0.1} justifyContent={'flex-start'}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Box
          width={'100%'}
          style={{marginVertical: ms(10)}}
          flexDirection={'row'}>
          {getTagsData?.list?.map(tagsItem => {
            return (
              <TouchableOpacity onPress={() => setSelected(tagsItem.text)}>
                <Box
                  style={[
                    styles.tagView,
                    {
                      backgroundColor:
                        tagsItem.text == selected
                          ? Colors.blackColor
                          : Colors.greyBox,
                    },
                  ]}>
                  <PlainText
                    color={
                      tagsItem.text == selected
                        ? Colors.white
                        : Colors.blackColor
                    }
                    fontSize={fontSizes[3]}>
                    {tagsItem.text}
                  </PlainText>
                </Box>
              </TouchableOpacity>
            );
          })}
        </Box>
      </ScrollView>
    </Box>
  );
};
const styles = StyleSheet.create({
  tagView: {
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: s(20),
    paddingHorizontal: ms(17),
    paddingVertical: ms(10),
    marginHorizontal: ms(7),
  },
});
const mapStateToProps = ({app: {getTagsData}}) => ({getTagsData});
export default connect(mapStateToProps, {})(TagList);
