import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import React, {createRef} from 'react';
import {Logo} from '../../../Photos/Photos';
import {Gray, Main_color} from '../../../Theme/Color';
import {Component} from 'react';
import {connect} from 'react-redux';
import publicIP from 'react-native-public-ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backend from '../../../Backend/Backend';
import messaging from '@react-native-firebase/messaging';
import CustomAlert from '../../../CustomAlert/CustomAlert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const backend = new Backend();
const {height} = Dimensions.get('screen');

class Login extends Component {
  constructor() {
    super();
    this.state = {
      UserName: '',
      PassWord: '',
      server_code: '00001',
      isLoading: false,
      fcmtoken: '',
      ip: '',
      modal: false,
      type: 0,
      text: '',
      input1: false,
      input2: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.netinfo();
    messaging()
      .getToken()
      .then(token => {
        this.setState({fcmtoken: token});
      });
  }

  netinfo() {
    publicIP()
      .then(ip => {
        this.setState({ip: ip});
      })
      .catch(error => {});
  }

  login() {
    if (this.state.server_code == '') {
      this.setState({
        modal: true,
        type: 3,
        text: 'Enter Your Server Code',
      });
    } else if (this.state.UserName == '') {
      this.setState({
        modal: true,
        type: 3,
        text: 'Enter Your Username',
      });
    } else if (this.state.PassWord == '') {
      this.setState({
        modal: true,
        type: 3,
        text: 'Enter Your Password',
      });
    } else {
      this.setState({isLoading: true});

      let data = {
        UserName: this.state.UserName,
        PassWord: this.state.PassWord,
        server_code: this.state.server_code,
        fcmtoken: this.state.fcmtoken,
        ip: this.state.ip,
      };

      backend.login(data).then(r => {
        this.setState({isLoading: false});
        if (r.error == 'False') {
          AsyncStorage.setItem('username', r.data.username);
          AsyncStorage.setItem('username_id', JSON.stringify(r.data.id));
          AsyncStorage.setItem('username_data', JSON.stringify(r.data));
          AsyncStorage.setItem('token', r.token);
          AsyncStorage.setItem('server_code', r.data.server_code);
          AsyncStorage.setItem('IsLoggedIn', '1');
          this.props.username(r.data.username);
          this.props.server_code(r.data.server_code);
          this.props.username_id(JSON.stringify(r.data.id));
          this.props.token(r.token);
          this.props.isLogin(1);
        } else {
          this.setState({
            modal: true,
            type: 3,
            text: r.message,
            y: 0,
          });
        }
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
        contentContainerStyle={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
        style={login.main}>
        <Modal
          animationType="slide"
          visible={this.state.modal}
          transparent={true}
          style={{flex: 1}}
          onRequestClose={() => {
            this.setState({modal: false});
          }}>
          <CustomAlert
            modal={() => this.setState({modal: false})}
            type={this.state.type}
            text={this.state.text}
          />
        </Modal>
        <View
          style={{
            flex: 1,
            backgroundColor: Main_color,
            borderBottomLeftRadius: 60,
            borderBottomRightRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 550,
              width: '90%',
              elevation: 10,
              backgroundColor: '#ffffff',
              borderRadius: 30,
              marginTop: '80%',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={Logo} style={login.image} />
            </View>
            <View
              style={{
                flex: 1,
                paddingRight: 20,
                paddingLeft: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={login.inputform}>
                <View
                  style={{
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome name="user" color={'gray'} size={30} />
                </View>
                <TextInput
                  placeholderTextColor={'rgba(0,0,0,0.5)'}
                  value={this.state.UserName}
                  onChangeText={t => this.setState({UserName: t})}
                  placeholder="Username"
                  style={[
                    login.username,
                    {
                      borderBottomColor:
                        this.state.input1 == true ? Main_color : 'gray',
                    },
                  ]}
                  onFocus={() => {
                    this.setState({input1: true});
                  }}
                  onBlur={() => {
                    this.setState({input1: false});
                  }}
                />
              </View>
              <View style={login.inputform}>
                <View
                  style={{
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons name="key" color={'gray'} size={30} />
                </View>
                <TextInput
                  placeholderTextColor={'rgba(0,0,0,0.5)'}
                  value={this.state.PassWord}
                  onChangeText={t => this.setState({PassWord: t})}
                  placeholder="Password"
                  style={[
                    login.username,
                    {
                      borderBottomColor:
                        this.state.input2 == true ? Main_color : 'gray',
                    },
                  ]}
                  onFocus={() => {
                    this.setState({input2: true});
                  }}
                  onBlur={() => {
                    this.setState({input2: false});
                  }}
                  onSubmitEditing={() => this.login()}
                />
              </View>
            </View>
            {this.state.isLoading ? (
              <TouchableOpacity style={login.login}>
                <ActivityIndicator size={'large'} color={Main_color} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => this.login()}
                activeOpacity={1}
                style={login.login}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: Main_color,
                  }}>
                  LOGIN
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{marginTop: '10%'}}>
            <Text style={login.alert}>
              This is Virtual Trading App For Educatinal Pirpose Only
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 10,
            alignItems: 'flex-end',
          }}></View>
      </KeyboardAvoidingView>
    );
  }
}

const MapDispatchToPorps = disptach => {
  return {
    isLogin: t => disptach({type: 'LOGIN', payload: t}),
    token: r => {
      disptach({type: 'TOKEN', payload: r});
    },
    username_id: r => {
      disptach({type: 'USERNAME_ID', payload: r});
    },
    server_code: r => {
      disptach({type: 'SERVER_CODE', payload: r});
    },
    username: r => {
      disptach({type: 'USERNAME', payload: r});
    },
  };
};

export default connect(null, MapDispatchToPorps)(Login);

const login = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageview: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 130,
    width: 130,
  },
  secoundview: {
    flex: 2,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Gray,
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputform: {
    height: 65,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    width: '100%',
    elevation: 5,
  },
  username: {
    height: 45,
    width: '70%',
    fontWeight: '500',
    color: '#000000',
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    borderColor: 'gray',
    borderBottomWidth: 2,
    fontSize: 18,
  },
  login: {
    height: 45,
    width: 170,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Main_color,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -30,
  },
  loginbutton: {
    marginTop: 40,
    alignSelf: 'center',
    height: 55,
    backgroundColor: Main_color,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  logintext: {
    color: '#fff',
    fontSize: 20,
    flex: 2,
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  loginicon: {
    height: 22,
    width: 20,
    marginRight: 20,
  },
  alert: {
    alignSelf: 'center',
    fontSize: 10,
    fontWeight: '100',
    color: '#000000',
  },
});
