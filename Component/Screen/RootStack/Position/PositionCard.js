import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BUY, Main_color, Red, SELL} from '../../../Theme/Color';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import SocketContext from '../Home/SocketContext';
import SqOff from './SqOff';

const PositionCard = props => {
  const refRBSheet = useRef();
  const socket = useContext(SocketContext);
  const [ask, setask] = useState(0);
  const [bid, setbid] = useState(0);
  const [pf, setpf] = useState(0);
  let ismouted = useIsFocused();
  const sockettrade = msg => {
    if (ismouted) {
      if (bid !== msg.Bid) {
        setbid(msg.Bid);
        if (props.item.buy_sale == 0) {
          let Profitloss = 0;
          if (msg.Bid > 0) {
            Profitloss =
              parseFloat(parseFloat(msg.Bid) - parseFloat(props.item.rate)) *
              parseFloat(props.item.qty);
          } else {
            Profitloss = 0;
          }
          if (Profitloss == 0) {
          } else {
            if (props.item.fut_mcx == 1 || props.item.fut_mcx == 2) {
              Profitloss =
                Profitloss -
                ((props.item.brokerage * props.item.qty) /
                  props.item.lot_size) *
                  2;
            } else {
              if (msg.Bid > 0) {
                Profitloss =
                  parseFloat(Profitloss) -
                  parseFloat(
                    (props.item.brokerage * props.item.qty * msg.Bid) / 100,
                  ) -
                  parseFloat(
                    (props.item.brokerage * props.item.qty * props.item.rate) /
                      100,
                  );
              } else {
                Profitloss =
                  parseFloat(Profitloss) -
                  parseFloat(
                    (props.item.brokerage * props.item.qty * msg.LTP) / 100,
                  ) -
                  parseFloat(
                    (props.item.brokerage * props.item.qty * props.item.rate) /
                      100,
                  );
              }
            }
          }
          setpf(Profitloss);
        }
      }
      if (ask !== msg.Ask) {
        setask(msg.Ask);
        if (props.item.buy_sale == 1) {
          let Profitloss2 = 0;
          if (parseFloat(msg.Ask) > 0) {
            Profitloss2 = (props.item.rate - msg.Ask) * props.item.qty;
          } else {
            Profitloss2 = 0;
          }

          if (Profitloss2 == 0) {
          } else {
            if (props.item.fut_mcx == 1 || props.item.fut_mcx == 2) {
              Profitloss2 =
                Profitloss2 -
                ((props.item.brokerage * props.item.qty) /
                  props.item.lot_size) *
                  2;
            } else {
              if (msg.Ask > 0) {
                Profitloss2 =
                  parseFloat(Profitloss2) -
                  parseFloat(
                    (props.item.brokerage * props.item.qty * msg.Ask) / 100,
                  ) -
                  parseFloat(
                    (props.item.brokerage * props.item.qty * props.item.rate) /
                      100,
                  );
              } else {
                Profitloss2 =
                  parseFloat(Profitloss2) -
                  parseFloat(
                    (props.item.brokerage * props.item.qty * msg.LTP) / 100,
                  ) -
                  parseFloat(
                    (props.item.brokerage * props.item.qty * props.item.rate) /
                      100,
                  );
              }
            }
          }

          setpf(Profitloss2);
        }
      }
    }
  };
  const socketbidask = msg => {
    if (ismouted) {
      if (bid !== msg.Bid) {
        setbid(msg.Bid);
        if (props.item.buy_sale == 0) {
          let Profitloss3 = 0;
          Profitloss3 = (msg.Bid - props.item.rate) * props.item.qty;
          if (props.item.fut_mcx == 1 || props.item.fut_mcx == 2) {
            Profitloss3 =
              Profitloss3 -
              ((props.item.brokerage * props.item.qty) / props.item.lot_size) *
                2;
          } else {
            Profitloss3 =
              parseFloat(Profitloss3) -
              parseFloat(
                (props.item.brokerage * props.item.qty * msg.Bid) / 100,
              ) -
              parseFloat(
                (props.item.brokerage * props.item.qty * props.item.rate) / 100,
              );
          }
          setpf(Profitloss3);
        }
      }
      if (ask !== msg.Ask) {
        setask(msg.Ask);
        if (props.item.buy_sale == 1) {
          let Profitloss4 = 0;
          Profitloss4 = (props.item.rate - msg.Ask) * props.item.qty;
          if (props.item.fut_mcx == 1 || props.item.fut_mcx == 2) {
            Profitloss4 =
              Profitloss4 -
              ((props.item.brokerage * props.item.qty) / props.item.lot_size) *
                2;
          } else {
            Profitloss4 =
              parseFloat(Profitloss4) -
              parseFloat(
                (props.item.brokerage * props.item.qty * msg.Ask) / 100,
              ) -
              parseFloat(
                (props.item.brokerage * props.item.qty * props.item.rate) / 100,
              );
          }
          setpf(Profitloss4);
        }
      }
    }
  };

  useEffect(() => {
    socket.emit('giverate', props.item.script_id);

    socket.on('trade' + props.item.script_id, sockettrade);

    socket.on('bidask' + props.item.script_id, socketbidask);

    return () => {
      socket.off('trade' + props.item.script_id, sockettrade);

      socket.off('bidask' + props.item.script_id, socketbidask);
    };
  }, []);
  props.calc_pf(props.item.id, pf, props.total);

  return (
    <TouchableOpacity
      onPress={() => refRBSheet.current.open()}
      style={{
        height: 70,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        marginTop: props.index == 0 ? 20 : 10,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        marginBottom: 5,
      }}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: Main_color,
            }}>
            {props.item.symbol}
          </Text>
          <Text
            style={{
              color: '#585858',
              fontSize: 10,
              marginLeft: 7,
              marginTop: 5,
              fontWeight: 'bold',
            }}>
            {moment(props.item.expiry_date).format('DD MMM YY')}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 10,
              color: props.item.buy_sale == 0 ? BUY : SELL,
            }}>
            {props.item.buy_sale == 0 ? 'BUY' : 'SELL'}
            {props.item.fut_mcx == 0
              ? ' (' + props.item.qty + ') '
              : ' (' + props.item.qty / props.item.lot_size + ') '}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{color: '#585858', fontWeight: 'bold'}}>
            S : {props.item.rate}
          </Text>
          <AntDesign name="arrowright" size={15} color={props.theme} />
          <Text style={{color: '#585858', fontWeight: 'bold'}}>
            C :{' '}
            {props.item.buy_sale == 0
              ? parseFloat(bid).toFixed(2)
              : parseFloat(ask).toFixed(2)}
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: parseFloat(pf).toFixed(2) < 0 ? SELL : BUY,
            }}>
            {parseFloat(pf).toFixed(2)}
          </Text>
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
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
            padding: 10,
          },
        }}>
        <SqOff
          item={props.item}
          ask={ask}
          bid={bid}
          pf={pf}
          close={() => {
            props.load();
          }}
        />
      </RBSheet>
    </TouchableOpacity>
  );
};

const MapStateToProps = state => {
  return {
    theme: state.theme,
  };
};

const MapStateToDispatch = dispatch => {
  return {
    calc_pf: (r, h, total) => {
      dispatch({type: 'PF', script_id: r, pf: h, total: total});
    },
  };
};

export default connect(MapStateToProps, MapStateToDispatch)(PositionCard);
