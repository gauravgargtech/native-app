import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {APP_NAVIGATOR, ERROR_NAVIGATOR, HOME_NAVIGATOR} from './routes';
import AppNavigator from './AppNavigator';
import ErrorNavigator from './ErrorNavigator';
import HomeNavigator from './HomeNavigator';
import {connect} from 'react-redux';
import {getNetInfoStatus} from '../store/actions';
const Stack = createStackNavigator();
const Navigator = ({isConnected}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isConnected ? (
          <Stack.Screen name={APP_NAVIGATOR} component={AppNavigator} />
        ) : (
          <Stack.Screen name={ERROR_NAVIGATOR} component={ErrorNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const mapStateToProps = ({app: {isConnected}}) => ({
  isConnected,
});
export default connect(mapStateToProps, {getNetInfoStatus})(Navigator);
