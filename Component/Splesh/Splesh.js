import {View, Image, StatusBar, Text} from 'react-native';
import React, {Component} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';
import {Main_color} from '../Theme/Color';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
export default class Splesh extends Component {
  componentDidMount() {
    StatusBar.setBackgroundColor(Main_color);
    PushNotification.createChannel({
      channelId: 'Dtrade', // (required)
      channelName: 'Dtrade', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: 'app_sound.mp3', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    });
    this.setNavigationColor();
  }

  setNavigationColor = color => {
    changeNavigationBarColor(Main_color);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}>
        <Image
          source={require('./dtrade.gif')}
          style={{height: 460, width: 250}}
        />
      </View>
    );
  }
}
