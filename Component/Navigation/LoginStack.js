import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screen/LoginStack/Login/Login';
import Register from '../Screen/LoginStack/Register/Register';
import Forgot from '../Screen/LoginStack/Forgot/ForgatePassword';

const Stack = createNativeStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
  );
}
