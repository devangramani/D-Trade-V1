import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {Component} from 'react';
import {Main_color} from '../../../Theme/Color';
import Feather from 'react-native-vector-icons/Feather';
import CustomAlert from '../../../CustomAlert/CustomAlert';
import TopCard from './TopCard';
import PositionCard from './PositionCard';
import Backend from '../../../Backend/Backend';
import {connect} from 'react-redux';
const backend = new Backend();

class Position extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      username_id: '',
      token: '',
      server_code: '',
      refreshing: false,
      balance: '',
      booked: '',
      limit: '',
      multiplier: '',
      loading: true,
      modal: false,
      type: 0,
      text: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.load_position();
    });
    this.load_position();
  }

  load_position() {
    this.setState({loading: true});
    let data = {
      token: this.props.token,
      id: this.props.username_id,
      server_code: this.props.server_code,
    };

    backend.position(data).then(r => {
      this.props.clear_pf();
      if (r.error == 'False') {
        if (r.data.length == 0) {
          this.props.clear_pf();
        }
        this.setState({
          data: r.data,
          loading: false,
          balance: r.balance,
          booked: r.booked,
          limit: r.limit,
          multiplier: r.multiplier,
        });
      } else {
        this.setState({
          type: 3,
          modal: true,
          text: r.message,
        });
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
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
            height: 55,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              height: 55,
              width: 55,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather size={30} name="arrow-left-circle" color={Main_color} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                height: 55,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 22,
                  color: Main_color,
                  fontWeight: 'bold',
                }}>
                Position
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Notification')}
            style={{
              height: 55,
              width: 55,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather name="bell" color={Main_color} size={30} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TopCard
            booked={this.state.booked}
            balance={this.state.balance}
            limit={this.state.limit}
            multiplier={this.state.multiplier}
          />
        </View>
        <View
          style={{
            flex: 2.5,
            backgroundColor: '#f2f2f2',
          }}>
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
                No Position Found
              </Text>
              <TouchableOpacity
                onPress={() => this.load_position()}
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
              refreshing={this.state.refreshing}
              onRefresh={() => this.load_position()}
              renderItem={({item}) => {
                return (
                  <PositionCard
                    item={item}
                    total={this.state.data.length}
                    load={() => this.load_position()}
                  />
                );
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
    username: state.username,
    theme: state.theme,
  };
};

const MapStateToDispatch = dispatch => {
  return {
    clear_pf: () => {
      dispatch({type: 'CLEAR_PF'});
    },
  };
};

export default connect(MapStateToProps, MapStateToDispatch)(Position);
