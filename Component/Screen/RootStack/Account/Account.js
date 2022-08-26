import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BUY, Main_color, SELL} from '../../../Theme/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Antdesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import moment from 'moment';
function Account(props) {
  const [data, setData] = useState('');
  const [sound, setSound] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('username_data').then(r => {
      setData(JSON.parse(r));
    });

    changeNavigationBarColor(Main_color);
    StatusBar.setBackgroundColor(Main_color);
  }, []);

  const sounds = val => {
    setSound(val);
    AsyncStorage.setItem('sound', JSON.stringify(val == true ? 1 : 0));
  };

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure exit account',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => props.logout(0),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View
        style={{
          height: 55,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            height: 55,
            width: 55,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Feather size={30} name="arrow-left-circle" color={Main_color} />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            paddingLeft: 10,
            color: Main_color,
            flex: 1,
          }}>
          Profile
        </Text>
        <TouchableOpacity
          onPress={() => sounds(!sound)}
          style={{
            height: 55,
            width: 55,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            borderRadius: 30,
          }}>
          <Entypo
            size={30}
            name={sound ? 'sound' : 'sound-mute'}
            color={Main_color}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.3,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          flexDirection: 'row',
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            padding: 22,
            borderRadius: 20,
            elevation: 4,
          }}>
          <Image
            style={{height: 70, width: 70}}
            source={require('../../../Photos/Photo/Logo.png')}
          />
        </View>
        <View style={{flex: 0.7}}>
          <Text
            style={{
              marginTop: 10,
              fontWeight: 'bold',
              color: Main_color,
              padding: 7,
              borderRadius: 7,
              fontSize: 22,
            }}>
            {data.name}
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontWeight: 'bold',
              color: Main_color,
              padding: 7,
              borderRadius: 7,
            }}>
            Username : {data.username}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          padding: 20,
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#ffffff',
        }}>
        <ScrollView
          style={{
            height: 400,
            elevation: 3,
            borderRadius: 30,
            backgroundColor: '#ffffff',
            padding: 20,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <View
            style={{
              height: 40,

              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{fontWeight: 'bold', color: Main_color, fontSize: 18}}>
                Status
              </Text>
            </View>
            <View>
              <Text
                style={{fontWeight: 'bold', color: Main_color, fontSize: 18}}>
                :
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: BUY,
                  fontSize: 18,
                  borderBottomWidth: 1,
                  paddingLeft: 5,
                }}>
                {data.status == 1 ? 'Active' : 'Deactive'}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{fontWeight: 'bold', color: Main_color, fontSize: 18}}>
                Acc Date
              </Text>
            </View>
            <View>
              <Text
                style={{fontWeight: 'bold', color: Main_color, fontSize: 18}}>
                :
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#585858',
                  fontSize: 13,
                  borderBottomWidth: 1,
                  paddingLeft: 5,
                }}>
                {moment(data.date_created).format('DD-MM-YYYY hh:mm:ss')}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{fontWeight: 'bold', color: Main_color, fontSize: 18}}>
                Total Deposit
              </Text>
            </View>
            <View>
              <Text
                style={{fontWeight: 'bold', color: Main_color, fontSize: 18}}>
                :
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#585858',
                  fontSize: 16,
                  borderBottomWidth: 1,
                  paddingLeft: 5,
                }}>
                {parseFloat(data.deposit_total).toFixed(2)}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{fontWeight: 'bold', color: Main_color, fontSize: 18}}>
                Current Deposit
              </Text>
            </View>
            <View>
              <Text
                style={{fontWeight: 'bold', color: Main_color, fontSize: 18}}>
                :
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#585858',
                  fontSize: 16,
                  borderBottomWidth: 1,
                  paddingLeft: 5,
                }}>
                {parseFloat(data.deposit_current).toFixed(2)}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{fontWeight: 'bold', color: Main_color, fontSize: 18}}>
                Limit Multiplier
              </Text>
            </View>
            <View>
              <Text
                style={{fontWeight: 'bold', color: Main_color, fontSize: 18}}>
                :
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#585858',
                  fontSize: 16,
                  borderBottomWidth: 1,
                  paddingLeft: 5,
                }}>
                {parseFloat(data.limit_multipier).toFixed(2)}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('Settlement')}
            style={{
              padding: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: Main_color}}>
              Settlement Report
            </Text>
            <Antdesign name="addfile" size={28} color={Main_color} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('Forgot')}
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: Main_color,
              borderRadius: 20,
              paddingLeft: 20,
              paddingRight: 20,
              width: '80%',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: Main_color,
                textAlign: 'center',
              }}>
              Chnage Password
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          onPress={() => logout()}
          style={{
            marginTop: -20,
            height: 40,
            backgroundColor: '#ffffff',
            borderWidth: 2,
            borderColor: Main_color,
            width: 100,
            alignSelf: 'center',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: Main_color}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const MapStateToProps = state => {
  return {
    token: state.token,
    username_id: state.username_id,
    server_code: state.server_code,
    theme: state.theme,
  };
};
const MapStateToDispatch = disptach => {
  return {
    settheme: a => disptach({type: 'THEME', payload: a}),
    logout: a => disptach({type: 'LOGIN', payload: a}),
  };
};

export default connect(MapStateToProps, MapStateToDispatch)(Account);
