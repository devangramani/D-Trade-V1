import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import {Gray, Main_color} from '../../../Theme/Color';
import PendingCard from './PendingCard';
import Backend from '../../../Backend/Backend';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import DatePicker from 'react-native-date-picker';
import {connect} from 'react-redux';
import publicIP from 'react-native-public-ip';
import Feather from 'react-native-vector-icons/Feather';
import TopCard from './TopCard';
import CustomAlert from '../../../CustomAlert/CustomAlert';
const {height} = Dimensions.get('screen');
const backend = new Backend();

class Pending extends Component {
  constructor() {
    super();
    this.state = {
      pending: [],
      arryFilter_pending: [],
      custom_report: [],
      start: new Date(),
      end: new Date(),
      loading: true,
      refreshing: false,
      report: 1,
      startdatemodal: false,
      enddatemodal: false,
      ip: '',
      visible: false,
      modal: false,
      type: 0,
      text: '',
      pending_order: [],
      success_order: [],
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.load_custom_trade(1);
    });
    this.load_custom_trade(1);
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

  load_custom_trade(a) {
    this.setState({
      visible: false,
      loading: true,
    });
    let data = {
      token: this.props.token,
      id: this.props.username_id,
      server_code: this.props.server_code,
      start:
        a == 1
          ? moment().format('YYYY-MM-DD 00:00:00')
          : a == 2
          ? moment()
              .subtract(1, 'weeks')
              .startOf('week')
              .format('YYYY-MM-DD 00:00:00')
          : a == 3
          ? moment().startOf('month').format('YYYY-MM-DD 00:00:00')
          : this.state.start,
      end:
        a == 1
          ? moment().format('YYYY-MM-DD 23:59:59')
          : a == 2
          ? moment().format('YYYY-MM-DD 23:59:59')
          : a == 3
          ? moment().endOf('month').format('YYYY-MM-DD 23:59:59')
          : this.state.end,
      ip: this.state.ip,
    };

    backend.load_trade(data).then(r => {
      let success_order = r.pending.filter(x => x.status == 1);
      let pending_order = r.pending.filter(x => x.status == 0);
      this.setState({
        loading: false,
      });
      console.log(r.pending);
      if (r.error == 'False') {
        this.setState({
          pending: r.pending,
          arryFilter_pending: r.pending,
          pending_order: pending_order,
          success_order: success_order,
        });
      } else {
        this.setState({
          modal: true,
          type: 3,
          text: r.message,
        });
      }
    });
  }

  pending_filter() {
    this.setState({
      pending: this.state.pending_order,
    });
  }

  success_filter() {
    this.setState({
      pending: this.state.success_order,
    });
  }

  render() {
    return (
      <View style={{backgroundColor: '#f2f2f2', flex: 1}}>
        <Modal
          animationType="slide"
          visible={this.state.modal}
          transparent={true}
          style={{flex: 1}}
          onRequestClose={() => {
            this.setState({
              modal: false,
            });
          }}>
          <CustomAlert
            modal={() =>
              this.setState({
                modal: false,
              })
            }
            type={this.state.type}
            text={this.state.text}
          />
        </Modal>
        {/* Header */}
        <View
          style={{
            height: 55,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            flexDirection: 'row',
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
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 22,
              color: Main_color,
              fontWeight: 'bold',
              flex: 1,
            }}>
            Pending Report
          </Text>
        </View>
        <TopCard
          pending={this.state.pending_order.length}
          success={this.state.success_order.length}
          pending_filter={() => this.pending_filter()}
          success_filter={() => this.success_filter()}
        />
        <View
          style={{
            flex: 1,
          }}>
          {this.state.loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color={Main_color} />
            </View>
          ) : this.state.pending.length > 0 ? (
            <FlatList
              keyExtractor={item => item.id.toString()}
              onRefresh={() => this.load_custom_trade(1)}
              refreshing={this.state.refreshing}
              contentContainerStyle={{
                backgroundColor: '#f2f2f2',
                padding: 10,
              }}
              data={this.state.pending}
              renderItem={item => {
                return (
                  <PendingCard
                    load_trade={() => this.load_custom_trade(1)}
                    item={item}
                  />
                );
              }}
              ListFooterComponent={() => {
                return <View style={{height: 200}}></View>;
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}>
              <Image
                style={{height: 200, width: 200, borderRadius: 10}}
                source={require('../../../Photos/NoData.png')}
              />
              <Text style={{color: Gray, fontSize: 22, marginTop: 10}}>
                No Pending Order Found
              </Text>
            </View>
          )}
        </View>

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          closeOnPressMask={true}
          closeOnPressBack={true}
          height={300}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.2)',
            },
            container: {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            },
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                height: 55,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 22, color: Main_color, fontWeight: 'bold'}}>
                Custom Report
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({startdatemodal: true});
                  }}
                  style={{
                    height: 40,
                    width: 100,
                    backgroundColor: '#EAF0FE',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 7,
                    marginRight: 10,
                  }}>
                  <Text style={{color: Main_color, fontWeight: 'bold'}}>
                    Start Date
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({startdatemodal: true});
                  }}
                  style={{
                    height: 40,
                    width: 100,
                    backgroundColor: '#EAF0FE',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 7,
                  }}>
                  <Text style={{fontWeight: 'bold', color: '#585858'}}>
                    {moment(this.state.start).format('DD-MM-YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({enddatemodal: true});
                  }}
                  style={{
                    height: 40,
                    width: 100,
                    backgroundColor: '#EAF0FE',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 7,
                    marginRight: 10,
                  }}>
                  <Text style={{fontWeight: 'bold', color: Main_color}}>
                    End Date
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({enddatemodal: true});
                  }}
                  style={{
                    height: 40,
                    width: 100,
                    backgroundColor: '#EAF0FE',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 7,
                  }}>
                  <Text style={{fontWeight: 'bold', color: '#585858'}}>
                    {moment(this.state.end).format('DD-MM-YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.load_custom_trade(4);
                  this.RBSheet.close();
                }}
                style={{
                  backgroundColor: Main_color,
                  height: 40,
                  borderRadius: 7,
                  width: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
        <DatePicker
          modal
          mode="date"
          open={this.state.startdatemodal}
          date={this.state.start}
          onConfirm={date => {
            this.setState({
              start: date,
              startdatemodal: false,
            });
          }}
          onCancel={() => {
            this.setState({startdatemodal: false});
          }}
        />
        <DatePicker
          modal
          mode="date"
          open={this.state.enddatemodal}
          date={this.state.end}
          onConfirm={date => {
            this.setState({
              end: date,
              enddatemodal: false,
            });
          }}
          onCancel={() => {
            this.setState({enddatemodal: false});
          }}
        />
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

export default connect(MapStateToProps)(Pending);
