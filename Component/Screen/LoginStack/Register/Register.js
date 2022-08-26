import {
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from 'react-native';
import React, {Component} from 'react';
import publicIP from 'react-native-public-ip';
import {Logo} from '../../../Photos/Photos';
import {Main_color} from '../../../Theme/Color';
import CustomAlert from '../../../CustomAlert/CustomAlert';
import Backend from '../../../Backend/Backend';
import AntDesign from 'react-native-vector-icons/AntDesign';

const backend = new Backend();
export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      ip: '',
      checked: false,
      number: '',
      name: '',
      username: '',
      password: '',
      modal: false,
      type: 0,
      text: '',
      input1: false,
      input2: false,
      input3: false,
      input4: false,
    };
  }

  componentDidMount() {
    this.netinfo();
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
  }

  netinfo() {
    publicIP()
      .then(ip => {
        this.setState({ip: ip});
        // '47.122.71.234'
      })
      .catch(error => {
        // 'Unable to get IP address.'
      });
  }

  register() {
    if (this.state.number == '' || this.state.number.length < 10) {
      this.setState({
        type: 3,
        modal: true,
        text: 'Invalid Mobile Number ',
      });
    } else if (this.state.name == '') {
      this.setState({
        type: 3,
        modal: true,
        text: 'Invalid Name',
      });
    } else if (this.state.username == '') {
      this.setState({
        type: 3,
        modal: true,
        text: 'Invalid Username ',
      });
    } else {
      let data = {
        number: this.state.number,
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        ip: this.state.ip,
      };
      backend.register(data).then(r => {
        if (r.error == 'False') {
          this.setState({
            type: 1,
            modal: true,
            text: r.message,
            loading: false,
          });
          setTimeout(() => {
            this.props.navigation.navigate('Login');
          }, 2000);
        } else {
          this.setState({
            type: 3,
            modal: true,
            text: r.message,
            loading: false,
          });
        }
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
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
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Image source={Logo} style={{margin: 10, height: 60, width: 60}} />
            <Text style={{color: 'gray', fontWeight: 'bold'}}>
              Please ragister with your Telegram/WhatsApp
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
              }}>
              Registration
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TextInput
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                keyboardType="number-pad"
                placeholder="Your Number"
                onFocus={() => this.setState({input1: true})}
                onBlur={() => this.setState({input1: false})}
                style={{
                  paddingLeft: 20,
                  fontWeight: 'bold',
                  fontSize: 18,
                  width: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                  borderWidth: this.state.input1 == true ? 2 : 0,
                  borderColor: Main_color,
                  elevation: 3,
                  color: '#000000',
                }}
                maxLength={10}
                value={this.state.number}
                onChangeText={e => this.setState({number: e})}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TextInput
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                value={this.state.name}
                onChangeText={e => this.setState({name: e})}
                onFocus={() => this.setState({input2: true})}
                onBlur={() => this.setState({input2: false})}
                placeholder="Name"
                style={{
                  paddingLeft: 20,
                  fontWeight: 'bold',
                  fontSize: 18,
                  width: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                  borderWidth: this.state.input2 == true ? 2 : 0,
                  borderColor: Main_color,
                  elevation: 3,
                  color: '#000000',
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TextInput
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                value={this.state.username}
                onChangeText={e => this.setState({username: e})}
                placeholder="Username"
                onFocus={() => this.setState({input3: true})}
                onBlur={() => this.setState({input3: false})}
                style={{
                  paddingLeft: 20,
                  fontWeight: 'bold',
                  fontSize: 18,
                  width: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                  borderWidth: this.state.input3 == true ? 2 : 0,
                  borderColor: Main_color,
                  elevation: 3,
                  color: '#000000',
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TextInput
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                value={this.state.password}
                onChangeText={e => this.setState({password: e})}
                placeholder="Password"
                secureTextEntry={true}
                onFocus={() => this.setState({input4: true})}
                onBlur={() => this.setState({input4: false})}
                style={{
                  paddingLeft: 20,
                  fontWeight: 'bold',
                  fontSize: 18,
                  width: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                  borderWidth: this.state.input4 == true ? 2 : 0,
                  borderColor: Main_color,
                  elevation: 3,
                  color: '#000000',
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.register()}
              style={{
                height: 50,
                width: 200,
                backgroundColor: Main_color,
                alignSelf: 'center',
                marginTop: 20,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                Register
              </Text>
              <AntDesign name="arrowright" size={30} color={'#ffffff'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={{alignItems: 'center', marginTop: 40}}>
              <Text>
                Alreday have account ?{'  '}
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: Main_color}}>
                  Login
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
