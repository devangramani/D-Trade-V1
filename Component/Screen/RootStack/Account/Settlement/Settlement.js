import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import {Main_color} from '../../../../Theme/Color';
import SettlementCard from './SettlementCard';
import Backend from '../../../../Backend/Backend';
import {connect} from 'react-redux';
import publicIP from 'react-native-public-ip';
import Antdesign from 'react-native-vector-icons/AntDesign';
const backend = new Backend();
class Settlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      ip: '',
    };
  }

  componentDidMount() {
    this.load_settelment();
    this.netinfo();
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

  load_settelment() {
    let data = {
      token: this.props.token,
      id: this.props.username_id,
      server_code: this.props.server_code,
      ip: this.state.ip,
    };
    backend.load_settelment(data).then(r => {
      if (r.error == 'False') {
        this.setState({
          data: r.data,
          loading: false,
        });
      } else {
        alert(r.message);
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
        <View style={[sett.header, {backgroundColor: this.props.theme}]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={sett.goback}>
            <Antdesign name="arrowleft" color={'#ffffff'} size={30} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingRight: 55,
            }}>
            <Text style={sett.settlment}>Settelment Report</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: this.props.theme,
            height: 80,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}></View>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#ffffff',
              margin: 20,
              marginTop: -20,
              padding: 5,
              height: 30,
              marginBottom: 5,
              borderRadius: 7,
            }}>
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', color: this.props.theme}}>
                Deposite
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', color: this.props.theme}}>
                Withdrawal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', color: this.props.theme}}>
                Balance
              </Text>
            </TouchableOpacity>
          </View>

          {this.state.loading == true ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={'large'} color={Main_color} />
            </View>
          ) : this.state.data.length == 0 ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', color: '#585858'}}>
                No Report Found
              </Text>
              <TouchableOpacity
                onPress={() => this.load_settelment()}
                style={{
                  height: 40,
                  width: 100,
                  backgroundColor: Main_color,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginTop: 10,
                }}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>Reload</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={this.state.data}
              contentContainerStyle={{
                padding: 10,
                paddingTop: 0,
              }}
              renderItem={(item, index) => {
                return <SettlementCard item={item} />;
              }}
            />
          )}
        </View>
      </View>
    );
  }
}

const MapStateToProps = state => {
  return {
    token: state.token,
    username_id: state.username_id,
    server_code: state.server_code,
    theme: state.theme,
  };
};

export default connect(MapStateToProps)(Settlement);

const sett = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goback: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backimg: {
    height: 25,
    width: 25,
  },
  settlment: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});
