import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Splesh from './Component/Splesh/Splesh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginStack from './Component/Navigation/LoginStack';
import RootStack from './Component/Navigation/RootStack';
import messaging from '@react-native-firebase/messaging';
import SocketContext from './Component/Screen/RootStack/Home/SocketContext';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {Text} from 'react-native';
var socket = io('http://dtrade.fun:3200');
messaging().onMessage(async remoteMessage => {
  PushNotification.localNotification({
    channelId: 'Trade1', // (required) channelId, if the channel doesn't exist, notification will not trigger.// (optional)
    showWhen: true, // (optional) default: true
    autoCancel: true, // (optional) default: true/ (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.
    id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    title: remoteMessage.data.title, // (optional)
    message: remoteMessage.data.message, // (required)
    userInfo: remoteMessage.data.userInfo, // (optional) default: {} (using null throws a JSON value '<null>' error)
    playSound: true, // (optional) default: true
    soundName: 'app_sound.mp3', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
  });
});

function App(props) {
  const [splesh, setSplesh] = useState(true);
  const [password, setPassword] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSplesh(false);
    }, 1500);

    AsyncStorage.getItem('app_password').then(r => {
      if (r == '' || r == null) {
      } else {
        setPassword(true);
      }
    });

    AsyncStorage.getItem('IsLoggedIn').then(r => {
      if (r == 1 || r == '1') {
        props.login(1);
      } else {
        props.login(0);
      }
    });

    AsyncStorage.getItem('mode').then(r => {
      props.mode(r);
    });
    AsyncStorage.getItem('token').then(r => {
      props.token(r);
    });
    AsyncStorage.getItem('username_id').then(r => {
      props.username_id(r);
    });
    AsyncStorage.getItem('server_code').then(r => {
      props.server_code(r);
    });
    AsyncStorage.getItem('username').then(r => {
      props.username(r);
    });
    AsyncStorage.getItem('Theme').then(r => {
      if (r == '' || r == null) {
        props.theme('#015c8d');
      } else {
        props.theme(r);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <SocketContext.Provider value={socket}>
        {splesh ? (
          <Splesh />
        ) : props.isLogged == 0 ? (
          <LoginStack />
        ) : (
          <RootStack />
        )}
      </SocketContext.Provider>
    </NavigationContainer>
  );
}

const MapStateToProps = state => {
  return {
    isLogged: state.isLogged,
    token_new: state.token,
    username_id_new: state.username_id,
    server_code_new: state.server_code,
    username_new: state.username,
  };
};

const MapDispatuchToProps = dispatch => {
  return {
    login: r => {
      dispatch({type: 'LOGIN', payload: r});
    },
    token: r => {
      dispatch({type: 'TOKEN', payload: r});
    },
    username_id: r => {
      dispatch({type: 'USERNAME_ID', payload: r});
    },
    server_code: r => {
      dispatch({type: 'SERVER_CODE', payload: r});
    },
    username: r => {
      dispatch({type: 'USERNAME', payload: r});
    },
    theme: r => {
      dispatch({type: 'THEME', payload: r});
    },
    mode: r => {
      dispatch({type: 'MODE', payload: r});
    },
  };
};

export default connect(MapStateToProps, MapDispatuchToProps)(App);