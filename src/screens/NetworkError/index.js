import React, {useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {Box, HeadingText, PlainText} from '../../components/index';
import {Colors} from '../../theme';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {InternetError} from '../../assets/images';
import {Logout_Action, BetaVersion} from '../../store/actions';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
const NetworkError = ({Logout_Action, BetaVersion, betaVersion}) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      try {
        Logout_Action();
        BetaVersion(true);
      } catch (e) {
        console.log('error while OFF INTERNET', e);
      }
    }
  }, [isFocused]);

  return (
    <Box flex={1} backgroundColor={Colors.lightWhite} as={SafeAreaView}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <Box style={styles.mainContainer}>
        <HeadingText
          color={Colors.SetupKidsButton}
          style={{
            fontSize: 20,
            textDecorationLine: 'underline',
          }}>
          Network Error
        </HeadingText>
        <Image
          style={{width: 250, height: 250, resizeMode: 'contain'}}
          source={InternetError}
        />
        <PlainText
          color={Colors.SetupKidsButton}
          textAlign={'center'}
          style={{
            marginLeft: 15,
            marginRight: 15,
            fontSize: 14,
          }}>
          Something not right. Please try checking both wifi/4g or try again
          later.
        </PlainText>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    height: hp('100%'),
  },
});
const mapStateToProps = ({app: {betaVersion}}) => ({betaVersion});
export default connect(mapStateToProps, {Logout_Action, BetaVersion})(
  NetworkError,
);
