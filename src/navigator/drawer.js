import React, {useEffect} from 'react';
import {Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {Box, SubHeadingText} from '../components/index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Drawer = createDrawerNavigator();
import {Home, Login, Register, VideoDetails} from '../screens';
import {
  HOME,
  LOGIN,
  REGISTER,
  VIDEO_DETAILS,
  LEARN_APP_NAVIGATOR,
  CATEGORY,
  READ_ALOUD,
  NURSERY_RHYMES,
  MANY_MORE,
  AND_MORE,
} from './routes';
import LearnAppHomeNavigator from './LearnAppHomeNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import {getCategoryAction} from '../store/actions';
import {connect} from 'react-redux';
const Category = () => {
  return (
    <SafeAreaView>
      <Box>
        <SubHeadingText>Categoty hello</SubHeadingText>
      </Box>
    </SafeAreaView>
  );
};
const DrawerNavigator = ({getCategoryAction, getCategoryData}) => {
  useEffect(() => {
    getCategoryAction();
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawerContent {...props} getCategoryData={getCategoryData} />
      )}
      screenOptions={{
        headerShown: false,
        drawerIcon: ({color}) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}>
      <Drawer.Screen name={HOME} component={Home} />
      <Drawer.Screen name={LOGIN} component={Login} />
      <Drawer.Screen name={REGISTER} component={Register} />
      <Drawer.Screen name={VIDEO_DETAILS} component={VideoDetails} />
      <Drawer.Screen name={'Demo'} component={Category}  options={{headerShown:true}} />
    </Drawer.Navigator>
  );
};
const mapStateToProps = ({app: {getCategoryData}}) => ({getCategoryData});
export default connect(mapStateToProps, {getCategoryAction})(DrawerNavigator);
