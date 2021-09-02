import React from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {Box} from '../../components/index';
import {Colors} from '../../theme';
import SearchPage from './widget/SearchPage';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';

const Search = ({navigation}) => {
  return (
    <Box flex={1} backgroundColor={Colors.lightWhite} as={SafeAreaView}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <Box style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchPage navigation={navigation} />
        </ScrollView>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: hp('100%'),
    backgroundColor: Colors.white,
    padding: ms(10),
  },
});
export default Search;
