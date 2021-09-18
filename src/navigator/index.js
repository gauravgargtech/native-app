import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {APP_NAVIGATOR} from './routes';
import AppNavigator from './AppNavigator';
import {connect} from 'react-redux';
import {getNetInfoStatus} from '../store/actions';
const Stack = createStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={APP_NAVIGATOR} component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const mapStateToProps = ({app: {isConnected}}) => ({
  isConnected,
});
export default connect(mapStateToProps, {getNetInfoStatus})(Navigator);
