import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Box} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CATEGORY_WISE} from './routes';
const CustomDrawerContent = props => {
  const {navigation, getCategoryData, getCategoryData_Action} = props;
  const onClickCategory = async ({item}) => {
    navigation.navigate(item?.onPress, {categoryItem: item});
    try {
      await getCategoryData_Action(item?.ID);
    } catch (e) {
      console.log('ERRORS AT GET_CATEGORY_DATA', e);
    }
  };

  const drawerMenuItems = getCategoryData?.map((categoryItem, index) => {
    return {
      ID: categoryItem?.id,
      icon: 'home-outline',
      inactive: 'home',
      title: categoryItem?.text,
      onPress: CATEGORY_WISE,
      name: 'Home',
    };
  });
  return (
    <Box flex={1}>
      <DrawerContentScrollView {...props}>
        {drawerMenuItems?.map((item, index) => {
          return (
            <DrawerItem
              key={index}
              icon={({color, size}) => (
                <Icon name={item?.icon} color={color} size={25} />
              )}
              label={item?.title}
              onPress={() => onClickCategory({item})}
            />
          );
        })}
      </DrawerContentScrollView>
    </Box>
  );
};
export default CustomDrawerContent;
