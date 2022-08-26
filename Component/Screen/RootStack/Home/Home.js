import {
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import RNLocation from 'react-native-location';
import React, {Component} from 'react';
import TopCard from './TopCard';
import TopStack from './../../../Navigation/TopStack';
import Backend from '../../../Backend/Backend';
import Permissions from '../Home/Permissions/Permissions';
import {Main_color} from '../../../Theme/Color';

const backend = new Backend();
class Home extends Component {
  constructor() {
    super();
    this.state = {
      contact: [],
      permissionsGranted: false,
      refreshing: false,
      watchlist: [],
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.load_watchlist();
      // var locationServicesAvailable =
      //   ConnectivityManager.areLocationServicesEnabled();
      // console.log(locationServicesAvailable);
      this.All_PERMISSIONS();
    });

    changeNavigationBarColor(this.props.theme);
    StatusBar.setBackgroundColor(this.props.theme);
    this.load_watchlist();
  }

  async load_watchlist() {
    let data = {
      token: this.props.token,
      id: this.props.username_id,
      server_code: this.props.server_code,
    };

    backend.load_watchlist(data).then(r => {
      if (r.error == 'False') {
        this.setState({fut_data: r.fut, arrayholder: r.fut, loading: false});
      } else if (r.message == 'Invalid User Token') {
        this.setState({
          loading: false,
          modal: true,
          type: 3,
          text: r.message,
        });
        this.props.logout(0);
      } else {
        this.setState({
          loading: false,
          modal: true,
          type: 3,
          text: r.message,
        });
      }
    });
  }

  async All_PERMISSIONS() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]).then(result => {
        if (
          result['android.permission.ACCESS_COARSE_LOCATION'] &&
          result['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
        ) {
          this.get_location();
        } else if (
          result['android.permission.ACCESS_COARSE_LOCATION'] ||
          result['android.permission.ACCESS_FINE_LOCATION'] ===
            'never_ask_again'
        ) {
          this.RBSheet_Permission.open();
        }
      });
    }
  }

  async get_location() {
    RNLocation.configure({
      distanceFilter: 5.0,
    });

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    }).then(granted => {
      if (granted) {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(
          locations => {
            let data = {
              token: this.props.token,
              id: this.props.username_id,
              server_code: this.props.server_code,
              latitude: locations[0].latitude,
              longitude: locations[0].longitude,
            };
            backend.location(data);
          },
        );
      }
    });
  }

  logout = () => {
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
          onPress: () => this.props.logout(0),
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.dashview, {backgroundColor: '#ffffff'}]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddScripts')}
            style={[styles.notification]}>
            <AntDesign name="search1" color={Main_color} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddScripts')}
            style={[
              styles.dashbored,
              {borderBottomColor: Main_color},
            ]}></TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.logout()}
            style={styles.notification}>
            <AntDesign name="logout" color={Main_color} size={30} />
          </TouchableOpacity>
        </View>
        <TopCard props={this.props} navigation={this.props.navigation} />
        <View style={{flex: 6, backgroundColor: '#f2f2f2'}}>
          <TopStack props={this.props} />
        </View>

        <RBSheet
          ref={ref => {
            this.RBSheet_Permission = ref;
          }}
          height={200}
          openDuration={250}
          closeOnDragDown={false}
          closeOnPressMask={false}
          closeOnPressBack={false}
          customStyles={{
            container: {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            },
          }}>
          <Permissions reload={() => this.RBSheet_Permission.close()} />
        </RBSheet>
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
const MapDisptachToProps = dispatch => {
  return {
    logout: a => dispatch({type: 'LOGIN', payload: a}),
  };
};
export default connect(MapStateToProps, MapDisptachToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  dashview: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 3,
  },
  dashbored: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    width: '70%',
  },
  dashboredtext: {
    color: '#fff',
    marginLeft: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  notification: {
    height: 50,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
