import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {Component} from 'react';
import {NoData, NotificationMain} from '../../../Photos/Photos';
import {Main_color} from '../../../Theme/Color';
import Backend from '../../../Backend/Backend';
import NotificationCard from './NotificationCard';
import {connect} from 'react-redux';
import publicIP from 'react-native-public-ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
const backend = new Backend();

class Notification extends Component {
  constructor() {
    super();
    this.state = {
      super_id: '',
      refreshing: false,
      loading: true,
      news: [],
      data: [],
      ip: '',
      userdata: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('username_data').then(r => {
      this.setState({userdata: JSON.parse(r)}, () => {
        this.news();
        this.netinfo();
      });
    });
  }

  news() {
    let data = {
      token: this.props.token,
      id: this.props.username_id,
      super_id: this.state.userdata.super_id,
      ip: this.state.ip,
    };
    backend.news(data).then(r => {
      this.setState({
        loading: false,
      });
      if (r.error == 'False') {
        this.setState({news: r.data});
      } else {
        alert(r.message);
      }
    });
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

  render() {
    return (
      <View style={market.container}>
        <View style={[market.hideheader]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={market.goback}>
            <Feather
              size={30}
              name="arrow-left-circle"
              color={this.props.theme}
            />
          </TouchableOpacity>
          <View style={market.centermain}>
            <Text
              style={{
                fontWeight: 'bold',
                color: Main_color,
                fontSize: 22,
              }}>
              News
            </Text>
          </View>
        </View>

        {this.state.loading ? (
          <View style={market.loadingview}>
            <ActivityIndicator size={'large'} color={Main_color} />
          </View>
        ) : this.state.news.length > 0 ? (
          <FlatList
            data={this.state.news}
            contentContainerStyle={market.flatlist}
            onRefresh={() => this.news()}
            refreshing={this.state.refreshing}
            renderItem={({item, index}) => {
              return <NotificationCard item={item} />;
            }}
          />
        ) : (
          <View style={market.nodataview}>
            <Image source={NoData} style={market.nodataimage} />
            <Text style={market.nodatatext}>No News Found</Text>
          </View>
        )}
      </View>
    );
  }
}

const MapStateToProps = state => {
  return {
    token: state.token,
    username_id: state.username_id,
    server_code: state.server_code,
    username: state.username,
    theme: state.theme,
  };
};

export default connect(MapStateToProps)(Notification);

const market = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  hideheader: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
  centermain: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  imagenofi: {
    height: 50,
    width: 40,
  },
  headershow: {
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notitext: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Main_color,
  },
  loadingview: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  flatlist: {
    padding: 10,
    paddingTop: 10,
  },
  nodataview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  nodataimage: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
  nodatatext: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 22,
    marginTop: 30,
  },
});
