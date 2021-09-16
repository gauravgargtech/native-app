import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DRAWER_NAVIGATOR} from './routes';
import DrawerNavigator from './drawer';
import {getLoginUser_Action} from '../store/actions';
import {connect} from 'react-redux';

const Stack = createStackNavigator();
const HomeNavigator = ({route, getLoginUser_Action, getCurrentUserData}) => {
  const {currentUser} = route.params ?? {};
  useEffect(() => {
    const user = async () => {
      try {
        if (currentUser != undefined) {
          await getLoginUser_Action(currentUser);
        }
      } catch (e) {
        alert('error while get category');
      }
    };
    user();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={DRAWER_NAVIGATOR}
        options={{
          headerShown: false,
        }}
        component={DrawerNavigator}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = ({app: {getCurrentUserData}}) => ({
  getCurrentUserData,
});
export default connect(mapStateToProps, {
  getLoginUser_Action,
})(HomeNavigator);
