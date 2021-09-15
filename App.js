/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import Navigator from './src/navigator';
import {getNetInfoStatus} from './src/store/actions';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
const App = ({getNetInfoStatus}) => {
  useEffect(() => {
    NetInfo.addEventListener(state => {
      updateNetinfo(state);
    });
  }, []);

  const updateNetinfo = state => {
    const func = async () => {
      try {
        await getNetInfoStatus(state.isConnected);
      } catch (e) {
        console.log('ERROR WHILE UPDATING INFO', e);
      }
    };
    func();
  };
  return <Navigator />;
};

const mapStateToProps = ({app: {isConnected}}) => ({
  isConnected,
});
export default connect(mapStateToProps, {getNetInfoStatus})(App);
