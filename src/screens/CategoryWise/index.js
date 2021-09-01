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
import {Colors} from '../../theme';
import CategoryVideoPage from './widget/CategoryVideoPage';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CategoryWise = ({route, navigation}) => {
  const {categoryItem} = route.params ?? {};
  return (
    <Box flex={1} backgroundColor={Colors.lightWhite} as={SafeAreaView}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <CustomHeader navigation={navigation} headerName={categoryItem?.title} />
      <Box style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CategoryVideoPage navigation={navigation} />
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
export default CategoryWise;
