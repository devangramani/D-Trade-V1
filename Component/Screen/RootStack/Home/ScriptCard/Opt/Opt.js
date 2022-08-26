import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {Component} from 'react';
import {Main_color} from '../../../../../Theme/Color';
import OptCard from './OptCard';
import Backend from '../../../../../Backend/Backend';
import {connect} from 'react-redux';
import CustomAlert from '../../../../../CustomAlert/CustomAlert';
const backend = new Backend();

class Opt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      id: props.id,
      server_code: props.server_code,
      search: '',
      fo_data: [],
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
        this.setState({fo_data: r.fo, arrayholder: r.fo, loading: false});
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  search(text) {
    if (text.length == 0) {
      this.setState({fo_data: this.state.arrayholder});
    } else {
      var data = [];
      data = this.state.arrayholder.filter(x =>
        x.name.toLowerCase().includes(text.toLowerCase()),
      );
      this.setState({fo_data: data});
    }
  }

  delete_script_reload(item) {
    this.setState({
      loading: false,
      modal: true,
      type: 3,
      text: item.name + ' is remove for watchlist',
    });
  }

  render() {
    return (
      <View style={{backgroundColor: '#ffffff', flex: 1}}>
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
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
          }}>
          {this.state.loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size={'large'} color={Main_color} />
            </View>
          ) : this.state.fo_data.length > 0 ? (
            <FlatList
              data={this.state.fo_data}
              refreshing={this.state.refreshing}
              contentContainerStyle={{
                backgroundColor: '#ffffff',
              }}
              onRefresh={() => this.load_watchlist()}
              renderItem={({item, index}) => {
                return (
                  <OptCard
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

export default connect(MapStateToProps)(Opt);

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
    backgroundColor: '#fff',
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
