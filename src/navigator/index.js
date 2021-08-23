import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Drawer from './drawer';
const Navigator = ({navigation}) => {
  return (
    <NavigationContainer>
      <Drawer navigation={navigation} />
    </NavigationContainer>
  );
};

export default Navigator;
