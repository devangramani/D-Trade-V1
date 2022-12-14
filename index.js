/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStore} from 'redux';
import Reducer from './Component/Redux/Reducer';
import {Provider} from 'react-redux';

import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const store = createStore(Reducer);
messaging().setBackgroundMessageHandler(async remoteMessage => {
  PushNotification.localNotification({
    channelId: 'trade', // (required) channelId, if the channel doesn't exist, notification will not trigger.
    showWhen: true, // (optional) default: true
    autoCancel: true, // (optional) default: true
    color: Main_color, // (optional) default: system default
    id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    title: remoteMessage.data.title, // (optional)
    message: remoteMessage.data.message, // (required)
    userInfo: remoteMessage.data.userInfo, // (optional) default: {} (using null throws a JSON value '<null>' error)
    playSound: true, // (optional) default: true
    soundName: 'app_sound.mp3',
  });
});
const new_app = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => new_app);
