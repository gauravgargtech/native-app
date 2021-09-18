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
import NetworkChecker from 'react-native-network-checker';

const App = ({getNetInfoStatus}) => {
  useEffect(() => {
    const connection = NetInfo.addEventListener(state => {
      const online = (state.isConnected && state.isInternetReachable);
      updateNetInfo(online);
    });
    return () => connection();
  }, []);

  const updateNetInfo = online => {
    const func = async () => {
      try {
        await getNetInfoStatus(online);
      } catch (e) {
        console.log('ERROR WHILE UPDATING INFO', e);
      }
    };
    func();
  };
  return (
    <NetworkChecker
      position="top"
      duration={2000} // In milliseconds
      notConnectedMessage="Not connected to Internet!"
      notConnectedTextColor="white"
      notConnectedBackgroundColor="grey"
      connectedMessage="Connected to Internet!"
      connectedTextColor="white"
      connectedBackgroundColor="green">
      <Navigator />
    </NetworkChecker>
  );
};

export default connect(null, {getNetInfoStatus})(App);
