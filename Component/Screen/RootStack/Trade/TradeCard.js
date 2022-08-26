import {Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {BUY, Main_color, SELL} from '../../../Theme/Color';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import {connect} from 'react-redux';

function TradeCard(props) {
  const refRBSheet = useRef();
  return (
    <>
      <TouchableOpacity
        onPress={() => refRBSheet.current.open()}
        style={{
          paddingLeft: 15,
          marginLeft: 5,
          marginRight: 5,
          marginBottom: 10,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#EAF0FE',
          backgroundColor: '#ffffff',
          borderRadius: 20,
          elevation: 4,
        }}>
        <View style={{marginTop: 7, flex: 1, marginTop: 10, marginBottom: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                color: props.theme,
                fontWeight: 'bold',
                paddingRight: 10,
                fontSize: 14,
              }}>
              {props.item.item.symbol}
            </Text>
            <Text style={{fontSize: 10, color: Main_color, fontWeight: 'bold'}}>
              {props.item.item.expiry_date == null
                ? null
                : moment(props.item.item.expiry_date).format('YY MMM DD')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <View style={{flex: 0}}>
              <Text
                style={{
                  fontSize: 10,
                  color:
                    props.item.item.type == 'Position Added' ||
                    props.item.item.type == 'Initial Transaction'
                      ? BUY
                      : SELL,
                  fontWeight: 'bold',
                  borderRadius: 5,
                  textTransform: 'uppercase',
                }}>
                {' pl : ' + props.item.item.profit_loss}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color:
                    props.item.item.type == 'Position Added' ||
                    props.item.item.type == 'Initial Transaction'
                      ? BUY
                      : SELL,
                  fontWeight: 'bold',
                  backgroundColor: '#EAF0FE',
                  borderRadius: 5,
                  padding: 3,
                  paddingLeft: 4,
                  paddingRight: 4,
                  marginTop: 5,
                  textTransform: 'uppercase',
                }}>
                {props.item.item.type}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginBottom: 10,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              flex: 1,
              paddingRight: 20,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: props.item.item.buy_sale == 0 ? BUY : SELL,
                fontWeight: 'bold',
              }}>
              {props.item.item.buy_sale == 0 ? 'BUY' : 'SELL'}
              {' ' + '(' + props.item.item.qty + ')'}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: props.item.item.buy_sale == 0 ? BUY : SELL,
                fontWeight: 'bold',
                marginTop: 1,
              }}>
              {parseFloat(props.item.item.base_rate).toFixed(2)}
            </Text>
            <Text
              style={{
                color: '#585858',
                fontWeight: 'bold',
                fontSize: 10,
                marginTop: 5,
              }}>
              {moment(props.item.item.date_created).format('DD-MM-YYYY')} |
              {moment(props.item.item.date_created).format(' hh:mm:ss')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={200}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 55,
              borderBottomWidth: 1,
              borderBottomColor: '#EAF0FE',
              marginRight: 10,
              marginLeft: 10,
            }}>
            <Text
              style={{
                color: props.theme,
                fontWeight: 'bold',
                paddingRight: 10,
                fontSize: 18,
              }}>
              {props.item.item.symbol}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: '#585858',
                fontWeight: 'bold',
                marginTop: 7,
              }}>
              {moment(props.item.item.expiry_date).format('YY MMM DD')}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}></View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#585858', fontWeight: 'bold'}}>
              NET RATE{' '}
            </Text>
            <Text style={{marginTop: 10, color: '#585858'}}>
              {parseFloat(props.item.item.base_rate).toFixed(2)}
            </Text>
          </View>
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#585858', fontWeight: 'bold'}}>
              COMMISSION
            </Text>
            <Text style={{marginTop: 10, color: '#585858'}}>
              {props.item.item.brokerage_amt}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold'}}>QUNTITY</Text>
            <Text style={{marginTop: 10, color: '#585858'}}>
              {props.item.item.qty}
            </Text>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <TouchableOpacity
          onPress={() => refRBSheet.current.close()}
          style={{
            alignSelf: 'center',
            marginBottom: 20,
            height: 45,
            width: 200,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: SELL,
            borderRadius: 10,
          }}>
          <Text style={{color: '#fff', fontSize: 22, fontWeight: 'bold'}}>
            BACK
          </Text>
        </TouchableOpacity>
      </RBSheet>
    </>
  );
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

export default connect(MapStateToProps)(TradeCard);
