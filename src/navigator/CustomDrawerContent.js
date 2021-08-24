import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Box} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawerContent = props => {
  console.log('custom navigator', props.getCategoryData);
  const drawerMenuItems = props.getCategoryData.map((categoryItem, index) => {
    return {
      id: categoryItem?.id,
      icon: 'home-outline',
      inactive: 'home',
      title: categoryItem?.text,
      onPress: 'Demo',
      name: 'Home',
    };
  });
  return (
    <Box flex={1}>
      <DrawerContentScrollView>
        {drawerMenuItems.map((item, index) => {
          return (
            <DrawerItem
              icon={({color, size}) => (
                <Icon name={item?.icon} color={color} size={25} />
              )}
              label={item?.title}
              onPress={() => props.navigation.navigate(item?.onPress)}
            />
          );
        })}
      </DrawerContentScrollView>
    </Box>
  );
};
export default CustomDrawerContent;
