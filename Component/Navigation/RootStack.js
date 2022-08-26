import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabStack from './TabStack';
import DrawerStack from './DrawerStack';
import Forgot from '../Screen/LoginStack/Forgot/ForgatePassword';
import Settlement from '../Screen/RootStack/Account/Settlement/Settlement';
import AddScripts from '../Screen/RootStack/Home/Scripts/AddScripts';
import BuySell from '../Screen/RootStack/Home/BuySell/BuySell';
import Buy from '../Screen/RootStack/Home/BuySell/Buy';
import Notification from '../Screen/RootStack/Notification/Notification';
import {connect} from 'react-redux';
const Stack = createNativeStackNavigator();

function RootStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="TabStack"
      screenOptions={{
        headerShown: false,
      }}>
      {props.mode == 0 ? (
        <Stack.Screen name="TabStack" component={DrawerStack} />
      ) : (
        <Stack.Screen name="TabStack" component={TabStack} />
      )}
      <Stack.Screen name="Settlement" component={Settlement} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="AddScripts" component={AddScripts} />
      <Stack.Screen name="BuySell" component={BuySell} />
      <Stack.Screen name="Buy" component={Buy} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
}

const MapStateToProps = state => {
  return {
    mode: state.mode,
  };
};

export default connect(MapStateToProps)(RootStack);
