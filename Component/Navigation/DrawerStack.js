import React from 'react';
import Home from '../Screen/RootStack/Home/Home';
import Trade from '../Screen/RootStack/Trade/Trade';
import Position from '../Screen/RootStack/Position/Position';
import Account from '../Screen/RootStack/Account/Account';
import CustomDrawer from './CustomDrawer';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Trade" component={Trade} />
      <Drawer.Screen name="Position" component={Position} />
      <Drawer.Screen name="Account" component={Account} />
    </Drawer.Navigator>
  );
}
