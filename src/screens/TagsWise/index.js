import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Box, Header, CustomHeader, Loader} from '../../components/index';
import {useIsFocused} from '@react-navigation/native';
import {Colors} from '../../theme';
import TagsVideoPage from './widget/TagsVideoPage';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const TagsWise = ({route, navigation}) => {
  const {tagsItem} = route.params ?? {};
  return (
    <Box flex={1} backgroundColor={Colors.lightWhite} as={SafeAreaView}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <CustomHeader navigation={navigation} headerName={tagsItem?.text} />
      <Box style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TagsVideoPage navigation={navigation} />
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: hp('100%'),
    backgroundColor: Colors.white,
  },
});
export default TagsWise;
