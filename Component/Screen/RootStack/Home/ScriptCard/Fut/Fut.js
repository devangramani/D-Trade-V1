import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  RefreshControl,
  View,
  Modal,
} from 'react-native';
import React, {Component} from 'react';
import {Main_color} from '../../../../../Theme/Color';
import FutCard from './FutCard';
import Backend from '../../../../../Backend/Backend';
import CustomAlert from '../../../../../CustomAlert/CustomAlert';
import {connect} from 'react-redux';

const backend = new Backend();

class Fut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      fut_data: [],
      arrayholder: [],
      loading: true,
      refreshing: false,
      modal: false,
      type: 0,
      text: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.load_watchlist();
    });
    this.load_watchlist();
  }

  load_watchlist() {
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

  search(text) {
    if (text.length == 0) {
      this.setState({fut_data: this.state.arrayholder});
    } else {
      var data = [];
      data = this.state.arrayholder.filter(x =>
        x.name.toLowerCase().includes(text.toLowerCase()),
      );
      this.setState({fut_data: data});
    }
  }

  delete_script_reload(item, type) {
    this.setState({
      loading: false,
      modal: true,
      type: type,
      text: item + ' is remove for watchlist',
    });
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
            setModal(true);
            this.setState({modal: false});
          }}>
          <CustomAlert
            modal={() => this.setState({modal: false})}
            type={this.state.type}
            text={this.state.text}
          />
        </Modal>
        <View style={styles.mainview}>
          {this.state.loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size={'large'} color={this.props.theme} />
            </View>
          ) : this.state.fut_data.length > 0 ? (
            <FlatList
              data={this.state.fut_data}
              contentContainerStyle={{
                backgroundColor: '#ffffff',
              }}
              refreshing={this.state.refreshing}
              onRefresh={() => this.load_watchlist()}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  colors={[this.props.theme, this.props.theme]}
                  onRefresh={() => this.load_watchlist()}
                />
              }
              renderItem={({item, index}) => {
                return (
                  <FutCard
                    item={item}
                    navigation={this.props.navigation}
                    reload={() => this.load_watchlist()}
                    delete_script_reload={(item, type) =>
                      this.delete_script_reload(item, type)
                    }
                  />
                );
              }}
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: '#ffffff',
              }}>
              <Image
                style={{height: '70%', width: '100%'}}
                source={require('../../../../../Photos/NoData.png')}
              />
              <Text style={{fontSize: 22, color: 'gray', fontWeight: '500'}}>
                No Script Found
              </Text>
            </View>
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
    username: state.username,
    theme: state.theme,
  };
};
const MapDisptachToProps = dispatch => {
  return {
    logout: a => dispatch({type: 'LOGIN', payload: a}),
  };
};
export default connect(MapStateToProps, MapDisptachToProps)(Fut);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topcard: {
    height: 150,
  },
  mainview: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  close: {
    width: 30,
    marginLeft: 10,
  },
  add: {
    height: 25,
    width: 25,
    marginRight: 20,
  },
  searchpress: {
    width: 30,
    marginLeft: 10,
  },
  searchimage: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  nodata: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  nodataimage: {
    height: '70%',
    width: '100%',
  },
  nodatafont: {
    fontSize: 22,
    color: 'gray',
    fontFamily: 'Gadugi-bold',
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: '75%',
    fontWeight: 'bold',
  },
});
