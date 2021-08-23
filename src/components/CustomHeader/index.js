import React from 'react';
import {StyleSheet} from 'react-native';
import {Box, PlainText, HeadingText, SubHeadingText} from '../../components';
import {Colors,fontSizes} from '../../theme';

const CustomHeader = ({headerName}) => {
  return (
    <Box style={styles.mainHeaderContainer}>
      <Box style={{justifyContent:'flex-start'}}/>
      <Box style={{justifyContent:'center'}}>
        <SubHeadingText style={{fontSize: fontSizes[3], color: Colors.black}}>
          {headerName}
        </SubHeadingText>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  mainHeaderContainer: {
    flex:1,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
  },
});
export default CustomHeader;
