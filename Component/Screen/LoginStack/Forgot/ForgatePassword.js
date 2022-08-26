import {
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
} from 'react-native';
import React, {Component} from 'react';
import {Gray, Main_color} from '../../../Theme/Color';
import Backend from '../../../Backend/Backend';
import CustomAlert from '../../../CustomAlert/CustomAlert';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
const backend = new Backend();

class ForgatePassword extends Component {
  constructor() {
    super();
    this.state = {
      mobile: '',
      modal: false,
      type: 0,
      text: '',
      input1: false,
    };
  }

  componentDidMount() {
    changeNavigationBarColor(this.props.theme);
    StatusBar.setBackgroundColor(this.props.theme);
  }

  sendOtp() {
    if (this.state.mobile == '' || this.state.mobile.length < 10) {
      this.setState({
        type: 3,
        modal: true,
        text: 'Enter Your 10 Digit Mobile Number',
      });
    } else {
      let data = {
        mobile: this.state.mobile,
      };
      backend.forgotpassword(data).then(r => {
        if (r.error == 'False') {
          alert(r.message);
        } else {
          alert(r.message);
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.goback}>
            <AntDesign name="arrowleft" color={this.props.theme} size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.text}>
          <Text style={styles.forgatetext}>Forgot Your Password ?</Text>
          <Text style={styles.subtext}>
            Enter your mobile number and we will send
          </Text>
          <Text style={styles.subtext}>
            your instructions to reset yout password.
          </Text>
        </View>
        <View style={styles.numberview}>
          <View style={styles.registernumber}>
            <TextInput
              onChangeText={e => {
                this.setState({mobile: e});
              }}
              placeholderTextColor={'rgba(0,0,0,0.5)'}
              maxLength={10}
              onFocus={() => this.setState({input1: true})}
              onBlur={() => this.setState({input1: false})}
              keyboardType="number-pad"
              style={[
                styles.textinput,
                {
                  borderWidth: this.state.input1 == true ? 2 : 0,
                  borderColor: this.props.theme,
                },
              ]}
              placeholder="Register Number"
            />
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              this.sendOtp();
            }}
            style={[styles.onpress, {backgroundColor: this.props.theme}]}>
            <Text style={styles.continues}>CONTINUE</Text>
            <AntDesign name="arrowright" color={'#ffffff'} size={35} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const MapStateToProps = state => {
  return {
    theme: state.theme,
  };
};
export default connect(MapStateToProps)(ForgatePassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    height: 55,
  },
  goback: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backimage: {
    height: 25,
    width: 25,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgatetext: {
    fontSize: 22,
    marginBottom: 20,
    color: Gray,
  },
  numberview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registernumber: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconnumber: {
    height: 55,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    height: 55,
    width: '80%',
    fontSize: 20,
    paddingLeft: 20,
    borderRadius: 10,
    borderWidth: 2,
    color: '#000000',
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onpress: {
    flexDirection: 'row',
    width: '70%',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 15,
  },
  continues: {
    color: '#fff',
    fontSize: 20,
  },
  subtext: {
    color: Gray,
  },
});
