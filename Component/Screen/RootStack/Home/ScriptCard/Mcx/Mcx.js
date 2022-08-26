import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {Main_color} from '../../../../../Theme/Color';
import Backend from '../../../../../Backend/Backend';
import McxCard from './McxCard';
import {connect} from 'react-redux';
import CustomAlert from '../../../../../CustomAlert/CustomAlert';
const backend = new Backend();

class Mcx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      loading: true,
      refreshing: false,
      mcx_data: [],
      arrayholder: [],
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
    this.setState({
      loading: true,
    });
    let data = {
      token: this.props.token,
      id: this.props.username_id,
      server_code: this.props.server_code,
    };
    backend.load_watchlist(data).then(r => {
      if (r.error == 'False') {
        this.setState({mcx_data: r.mcx, arrayholder: r.mcx, loading: false});
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  search(text) {
    if (text.length == 0) {
      this.setState({mcx_data: this.state.arrayholder});
    } else {
      var data = [];
      data = this.state.arrayholder.filter(x =>
        x.name.toLowerCase().includes(text.toLowerCase()),
      );
      this.setState({mcx_data: data});
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
              <ActivityIndicator size={'large'} color={Main_color} />
            </View>
          ) : this.state.mcx_data.length > 0 ? (
            <FlatList
              data={this.state.mcx_data}
              refreshing={this.state.refreshing}
              contentContainerStyle={{
                backgroundColor: '#ffffff',
              }}
              onRefresh={() => this.load_watchlist()}
              renderItem={({item, index}) => {
                return (
                  <McxCard
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
  };
};

export default connect(MapStateToProps)(Mcx);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  topcard: {
    height: 150,
  },
  mainview: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  mainsearchcard: {
    marginLeft: 20,
    marginRight: 20,
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: Main_color,
    flexDirection: 'row',
    alignItems: 'center',
  },
  close: {
    width: 30,
    marginLeft: 10,
  },
  icon: {
    fontSize: 25,
    color: Main_color,
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
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    fontSize: 16,
    marginLeft: 10,
    width: '75%',
    fontWeight: 'bold',
  },
});
