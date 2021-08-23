import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Box, PlainText} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms, s, vs} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../../theme';
import {getTagsAction} from '../../../store/actions';
import {connect} from 'react-redux';
const TagList = ({navigation, getTagsAction, getTagsData}) => {
  const [selected, setSelected] = useState('ALL');

  useEffect(() => {
    getTagsAction();
  }, []);

  return (
    <Box flex={0.1} justifyContent={'flex-start'}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Box height={hp('6%')} flexDirection={'row'}>
          {getTagsData.map(tagsItem => {
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
                    fontSize={fontSizes[2]}>
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
    justifyContent: 'center',
    height: vs(30),
    borderRadius: 30,
    padding: ms(8),
    margin: ms(5),
  },
});
const mapStateToProps = ({app: {getTagsData}}) => ({getTagsData});
export default connect(mapStateToProps, {getTagsAction})(TagList);
