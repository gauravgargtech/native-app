import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {APP_NAVIGATOR,AUTH_NAVIGATOR, INTERNET_ERROR} from './routes';
import AppNavigator from './AppNavigator';
import Authentication from './Authentication';
import {NetworkError} from '../screens';
import {connect} from 'react-redux';
import {getNetInfoStatus} from '../store/actions';
const Stack = createStackNavigator();
const Navigator = ({navigation, isConnected}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isConnected ? (
          <Stack.Screen name={APP_NAVIGATOR} component={AppNavigator} />
        ) : (
          <Stack.Screen name={INTERNET_ERROR} component={NetworkError} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const mapStateToProps = ({app: {isConnected}}) => ({
  isConnected,
});
export default connect(mapStateToProps, {getNetInfoStatus})(Navigator);
