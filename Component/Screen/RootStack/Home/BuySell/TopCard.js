import {View, Text, Dimensions} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
const {height, width} = Dimensions.get('screen');
import {BUY, Main_color, SELL} from '../../../../Theme/Color';
import SocketContext from '../SocketContext';
import {useContext} from 'react';
import {useIsFocused} from '@react-navigation/native';

import moment from 'moment';
export default function TopCard(props) {
  const socket = useContext(SocketContext);
  const [ask, setask] = useState(0);
  const [bid, setbid] = useState(0);
  const [high2, sethigh2] = useState(0);
  const [low2, setlow2] = useState(0);
  const [chng, setchng] = useState(0);
  const [percent, setpercent] = useState(0);
  const [ltp, setltp] = useState(0);
  var Ismouted = useIsFocused();
  const trade = msg => {
    if (Ismouted) {
      if (msg == null) {
        alert('Script is expire');
      } else {
        if (bid !== msg.Bid) {
          setbid(msg.Bid);
        }
        if (ask !== msg.Ask) {
          setask(msg.Ask);
        }
        if (high2 !== msg.High) {
          sethigh2(msg.High);
        }
        if (low2 !== msg.Low) {
          setlow2(msg.Low);
        }
        if (msg.LTP - msg.Previous_Close !== chng) {
          setchng(msg.LTP - msg.Previous_Close);
          setpercent(
            ((msg.LTP - msg.Previous_Close) / msg.Previous_Close) * 100,
          );
        }
        if (ltp !== msg.LTP) {
          setltp(msg.LTP);
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
    socket.emit('giverate', props.item.item.script_id);
    socket.on('trade' + props.item.item.script_id, trade);
    socket.on('bidask' + props.item.item.script_id, bidask);
    return () => {
      socket.off('trade' + props.item.item.script_id, trade);
      socket.off('bidask' + props.item.item.script_id, bidask);
    };
  }, []);

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 0,
        paddingBottom: 10,
      }}>
      <View
        style={{
          height: height / 8,
          flexDirection: 'row',
          borderRadius: 10,
        }}>
        <View
          style={{
            flex: 1,
            borderRadius: 10,
            paddingTop: 5,
            paddingBottom: 5,
            marginTop: 0,
            marginBottom: 0,
            paddingLeft: 10,
            backgroundColor: '#EAF0FE',
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: Main_color,
                }}>
                {props.item.item.name}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  marginTop: 7,
                  marginLeft: 5,
                  fontWeight: 'bold',
                  color: Main_color,
                }}>
                {moment(props.item.item.expiry_date).format('DD MMM YY')}
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 12,
                  color: chng > 0 ? 'green' : 'red',
                  fontWeight: 'bold',
                }}>
                {parseFloat(chng).toFixed(2)}{' '}
                {'(' + parseFloat(percent).toFixed(2) + '%)'}
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#585858',
                  fontWeight: 'bold',
                }}>
                H : {high2}
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#585858',
                  fontWeight: 'bold',
                }}>
                L : {low2}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    color: BUY,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  BID
                </Text>
              </View>
              <View
                style={{
                  flex: 3,
                }}>
                <Text
                  style={{
                    color: BUY,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {bid}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    color: SELL,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  ASK
                </Text>
              </View>
              <View
                style={{
                  flex: 3,
                }}>
                <Text
                  style={{
                    color: SELL,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {ask}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
