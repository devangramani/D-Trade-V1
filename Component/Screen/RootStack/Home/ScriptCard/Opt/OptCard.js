import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {BUY, Gray, Main_color, SELL} from '../../../../../Theme/Color';
import {connect} from 'react-redux';
import SocketContext from '../../SocketContext';
import {useContext} from 'react';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import Backend from '../../../../../Backend/Backend';
const backend = new Backend();
function OptCard(props) {
  const socket = useContext(SocketContext);
  const [ask, setask] = useState(0);
  const [bid, setbid] = useState(0);
  const [high2, sethigh2] = useState(0);
  const [low2, setlow2] = useState(0);
  const [chng, setchng] = useState(0);
  const [percent, setpercent] = useState(0);
  const [ltp, setltp] = useState(0);
  const [show, setShow] = useState(false);
  var Ismouted = useIsFocused();
  const trade = msg => {
    if (Ismouted) {
      if (msg == null) {
        alert('SCRIPT EXPIRE AUTO REMOVE TO WATCHLIST');
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
    socket.emit('giverate', props.item.script_id);
    socket.on('trade' + props.item.script_id, trade);
    socket.on('bidask' + props.item.script_id, bidask);
    return () => {
      socket.off('trade' + props.item.script_id, trade);
      socket.off('bidask' + props.item.script_id, bidask);
    };
  }, [Ismouted]);

  return (
    <TouchableOpacity
      key={props.item.id}
      onPress={() => setShow(!show)}
      activeOpacity={1}
      style={fut.mainview}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={fut.card}>
            <Text style={[fut.name, {color: '#000000'}]}>
              {props.item.name}
            </Text>
            <Text style={[fut.expiry, {color: '#000000'}]}>
              {moment(props.item.expiry_date).format('DD MMM YY')}
            </Text>
          </View>
          <View style={fut.ltpview}>
            <View style={fut.ltpsize}>
              <Text style={fut.ltptext}>
                LTP : <Text style={fut.ltptextin}>{ltp} </Text>
              </Text>
            </View>
          </View>
          <View style={fut.ltpsize}>
            <Text style={[fut.chnage, {color: chng > 0 ? BUY : SELL}]}>
              {parseFloat(chng).toFixed(2)}{' '}
              {'(' + parseFloat(percent).toFixed(2) + '%)'}
            </Text>
          </View>
          <View style={fut.ltpsize}>
            <Text style={[fut.date, {color: 'rgba(0,0,0,0.3)'}]}>
              {moment(props.item.date_created).format('DD-MMM-YY hh:mm:ss A')}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', color: 'green', fontSize: 12}}>
                BID
              </Text>
              <Text style={{fontWeight: 'bold', color: 'green', fontSize: 18}}>
                {bid}
              </Text>
              <Text style={{fontWeight: 'bold', color: Gray, fontSize: 12}}>
                L : {low2}
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', color: 'red', fontSize: 12}}>
                ASK
              </Text>
              <Text style={{fontWeight: 'bold', color: 'red', fontSize: 18}}>
                {ask}
              </Text>
              <Text style={{fontWeight: 'bold', color: Gray, fontSize: 12}}>
                H : {high2}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {show == true ? (
        <View
          style={{
            padding: 10,
            paddingBottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 5,
          }}>
          <View style={{flex: 1}}></View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Buy', {
                  buy_sell: 0,
                  item: props.item,
                });
              }}
              style={{
                padding: 7,
                backgroundColor: 'green',
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 7,
              }}>
              <Text style={{color: '#ffffff', fontWeight: 'bold'}}>BUY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Buy', {
                  buy_sell: 1,
                  item: props.item,
                })
              }
              style={{
                padding: 7,
                backgroundColor: SELL,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 10,
              }}>
              <Text style={{color: '#ffffff', fontWeight: 'bold'}}>SELL</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
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
export default connect(MapStateToProps)(OptCard);

const fut = StyleSheet.create({
  mainview: {
    marginRight: 10,
    marginLeft: 10,
    padding: 15,
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    elevation: 2,
    marginBottom: 7,
    marginBottom: 5,
    paddingBottom: 5,
  },
  cardview: {
    marginTop: 7,
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
  name: {
    color: Main_color,
    fontWeight: 'bold',
    paddingRight: 10,
    fontSize: 15,
  },
  expiry: {
    fontSize: 10,
    color: Main_color,
    fontWeight: 'bold',
  },
  ltpview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ltptext: {
    fontSize: 11,
    color: Gray,
    fontWeight: 'bold',
  },
  ltptextin: {
    color: BUY,
  },
  chnage: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  buysellview: {
    flexDirection: 'row',
    flex: 0.9,
    marginTop: 10,
    marginBottom: 10,
  },
  buysell: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bid: {
    fontSize: 12,
    color: BUY,
    fontWeight: 'bold',
  },
  bidtext: {
    marginTop: 7,
    color: BUY,
    fontWeight: 'bold',
    fontSize: 16,
  },
  ask: {
    fontSize: 12,
    color: SELL,
    fontWeight: 'bold',
  },
  asktext: {
    marginTop: 7,
    color: SELL,
    fontWeight: 'bold',
    fontSize: 17,
  },
});
