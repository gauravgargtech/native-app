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
import {NetworkError} from './src/screens';

const App = ({getNetInfoStatus}) => {
  useEffect(() => {
    NetInfo.addEventListener(state => {
      updateNetInfo(state);
    });
  }, []);

  const updateNetInfo = state => {
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

export default connect(null, {getNetInfoStatus})(App);
