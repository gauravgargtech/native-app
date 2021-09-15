/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, Fragment} from 'react';
import Navigator from './src/navigator';
import {getNetInfoStatus} from './src/store/actions';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
const App = ({getNetInfoStatus}) => {
  useEffect(() => {
    const networkState = NetInfo.addEventListener(state => {
      console.log('NETINFO STATE::', state);
      updateNetinfo(state);
    });
    return () => {
      networkState();
    };
  }, []);

  const updateNetinfo = state => {
    const func = async () => {
      try {
        getNetInfoStatus(state.isConnected);
      } catch (e) {
        console.log('ERROR WHILE UPDATING INFO', e);
      }
    };

    func();
  };
  return (
    <Fragment>
      <Navigator />
    </Fragment>
  );
};
export default connect(null, {getNetInfoStatus})(App);
