import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './drawer';
import ErrorDrawer from './errorDrawer';
import {connect} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {DRAWER_NAVIGATOR, ERROR_NAVIGATOR} from './routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();
const Stack=createStackNavigator();

const Navigator = ({navigation, isConnected}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isConnected ? (
          <Stack.Screen name={DRAWER_NAVIGATOR} component={DrawerNavigator} />
        ) : (
          <Stack.Screen name={ERROR_NAVIGATOR} component={ErrorDrawer} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const mapStateToProps = ({app: {isConnected}}) => ({
  isConnected,
});
export default connect(mapStateToProps, {})(Navigator);
