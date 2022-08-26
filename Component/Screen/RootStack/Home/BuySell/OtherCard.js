import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import SocketContext from '../SocketContext';
import {useIsFocused} from '@react-navigation/native';
export default function OtherCard(props) {
  const socket = useContext(SocketContext);
  const i = props.item;
  const [ask, setask] = useState(0);
  const [bid, setbid] = useState(0);
  const [pre_close, setpre_close] = useState(0);
  const [Open, setOpen] = useState(0);
  var Ismouted = useIsFocused();
  const trade = msg => {
    if (Ismouted) {
      if (msg == null) {
        alert('Script is expire');
      } else {
        if (pre_close !== msg.Previous_Close) {
          setpre_close(msg.Previous_Close);
        }
        if (Open !== msg.Open) {
          setOpen(msg.Open);
        }
      }
    }
  };
  const bidask = msg => {
    if (Ismouted) {
      if (bid !== msg.Bid) {
        setbid(msg.Bid);
      }
      if (ask !== msg.Ask) {
        setask(msg.Ask);
      }
    }
  };
  useEffect(() => {
    socket.emit('giverate', props.item.script_id);
    socket.on('trade' + props.item.script_id, trade);
    socket.on('bidask' + props.item.script_id, bidask);
    return () => {
      socket.off('trade' + props.item.script_id, trade);
      socket.off('bidask' + props.item.script_id, bidask);
    };
  }, []);
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          backgroundColor: '#EAF0FE',
          borderRadius: 10,
          margin: 5,
          padding: 5,
          elevation: 3,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#585858',
              fontSize: 12,
            }}>
            Open
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>:</Text>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#585858',
              fontSize: 16,
            }}>
            {JSON.parse(Open).toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#585858',
              fontSize: 12,
            }}>
            {i.script_type == 'fut' ? 'Min/Qty' : 'Min/Lot'}
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>:</Text>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#585858',
              fontSize: 16,
            }}>
            {i.script_type == 'fut'
              ? JSON.parse(i.min_qty).toFixed(2)
              : JSON.parse(i.qty_per_order / i.lot_size).toFixed(2)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          backgroundColor: '#EAF0FE',
          borderRadius: 10,
          margin: 5,
          padding: 5,
          elevation: 3,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#585858',
              fontSize: 12,
            }}>
            Pre. Close
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>:</Text>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#585858',
              fontSize: 16,
              paddingLeft: 10,
            }}>
            {JSON.parse(pre_close).toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#585858',
              fontSize: 12,
            }}>
            {i.script_type == 'fut' ? 'Max/Qty' : 'Max/Lot'}
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>:</Text>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#585858',
              fontSize: 16,
              paddingLeft: 10,
            }}>
            {i.script_type == 'fut'
              ? JSON.parse(i.total_quantity).toFixed(2)
              : JSON.parse(i.total_quantity / i.lot_size).toFixed(2)}
          </Text>
        </View>
      </View>
    </>
  );
}
