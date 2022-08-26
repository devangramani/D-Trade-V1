import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useIsFocused} from '@react-navigation/native';
import SocketContext from '../SocketContext';
import {BUY, Gray, Main_color, SELL} from '../../../../Theme/Color';
import moment from 'moment';
function BuySell(props) {
  const socket = useContext(SocketContext);
  const [ask, setask] = useState(0);
  const [bid, setbid] = useState(0);
  const [high2, sethigh2] = useState(0);
  const [low2, setlow2] = useState(0);
  const [chng, setchng] = useState(0);
  const [percent, setpercent] = useState(0);
  const [ltp, setltp] = useState(0);
  const [pre_close, setpre_close] = useState(0);
  const [Open, setOpen] = useState(0);
  const [time, settime] = useState(0);
  var Ismouted = useIsFocused();
  const trade = msg => {
    if (Ismouted) {
      if (msg == null) {
        alert('Script is not available');
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
        if (pre_close !== msg.Previous_Close) {
          setpre_close(msg.Previous_Close);
        }
        if (Open !== msg.Open) {
          setOpen(msg.Open);
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
  }, []);
  return (
    <View style={buy_sell.mainview}>
      <View style={buy_sell.container}>
        <View style={buy_sell.nameview}>
          <View style={buy_sell.namemainview}>
            <Text style={buy_sell.nametext}>
              {props.item.script_type == 'fo'
                ? props.item.symbol_display
                : props.item.name}
            </Text>
            <Text style={buy_sell.expiry}>
              {moment(props.item.expiry_date).format('DD MMM YY')}
            </Text>
          </View>
          <View style={buy_sell.ltpview}>
            <Text style={buy_sell.ltpviewtext}>
              LTP : <Text style={buy_sell.ltptext}>{ltp}</Text>
            </Text>
            <Text
              style={[
                buy_sell.chnage,
                {
                  color: chng > 0 ? BUY : SELL,
                },
              ]}>
              {parseFloat(chng).toFixed(2)}{' '}
              {'(' + parseFloat(percent).toFixed(2) + '%)'}
            </Text>
          </View>
        </View>
        <View style={buy_sell.bid_ask}>
          <View style={buy_sell.bid_ask_view}>
            <Text style={buy_sell.bid_text}>BID</Text>
            <Text style={buy_sell.bid}>{bid}</Text>
          </View>
          <View style={buy_sell.bid_ask_view}>
            <Text style={buy_sell.ask_text}>Ask</Text>
            <Text style={buy_sell.ask}>{ask}</Text>
          </View>
        </View>
      </View>
      <View style={buy_sell.detail}>
        <View style={buy_sell.detailmainview}>
          <View style={buy_sell.leftview}>
            <Text style={buy_sell.high}>High</Text>
            <Text style={buy_sell.coma}>:</Text>
            <Text style={buy_sell.high}>{' ' + high2}</Text>
          </View>
          <View style={buy_sell.leftview}>
            <Text style={buy_sell.high}>Open</Text>
            <Text style={buy_sell.coma}>:</Text>
            <Text style={buy_sell.high}>{' ' + Open}</Text>
          </View>
          <View style={buy_sell.leftview}>
            <Text style={buy_sell.high}>
              {props.item.script_type == 'fut' ? 'Min/Qty' : 'Min/Lot'}
            </Text>
            <Text style={buy_sell.coma}>:</Text>
            <Text style={buy_sell.high}>
              {' '}
              {props.item.script_type == 'fut'
                ? ' ' + props.item.qty_per_order
                : ' ' + props.item.qty_per_order / props.item.lot_size}{' '}
            </Text>
          </View>
        </View>
        <View style={buy_sell.rightview}>
          <View style={buy_sell.paddinglefttext}>
            <Text style={buy_sell.low}>Low</Text>
            <Text style={buy_sell.coma}>:</Text>
            <Text style={buy_sell.low}>{' ' + low2}</Text>
          </View>
          <View style={buy_sell.paddinglefttext}>
            <Text style={buy_sell.low}>Pre. Close</Text>
            <Text style={buy_sell.coma}>:</Text>
            <Text style={buy_sell.low}>{' ' + pre_close}</Text>
          </View>
          <View style={buy_sell.paddinglefttext}>
            <Text style={buy_sell.low}>
              {props.item.script_type == 'fut' ? 'Max/Qty ' : 'Max/Lot'}{' '}
            </Text>
            <Text style={buy_sell.coma}>:</Text>
            <Text style={buy_sell.low}>
              {props.item.script_type == 'fut'
                ? ' ' + props.item.total_quantity
                : ' ' + props.item.total_quantity / props.item.lot_size}
            </Text>
          </View>
        </View>
      </View>
      <View style={buy_sell.buy_sell}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Buy', {buy_sell: 0, item: props.item});
            props.rbsheetclose();
          }}
          style={buy_sell.buy_button}>
          <Text style={buy_sell.buy_sell_text}>BUY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Buy', {buy_sell: 1, item: props.item});
            props.rbsheetclose();
          }}
          style={buy_sell.sell_button}>
          <Text style={buy_sell.buy_sell_text}>SELL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default BuySell;

const buy_sell = StyleSheet.create({
  mainview: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#EAF0FE',
    flex: 0.6,
    paddingLeft: 10,
    paddingRight: 10,
  },
  nameview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  namemainview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nametext: {
    color: Main_color,
    fontWeight: 'bold',
    fontSize: 16,
  },
  expiry: {
    fontSize: 10,
    marginLeft: 10,
    fontWeight: 'bold',
    marginTop: 5,
    color: Main_color,
  },
  ltpview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'flex-start',
  },
  ltpviewtext: {
    fontSize: 10,
    color: Gray,
    fontWeight: 'bold',
  },
  ltptext: {
    color: BUY,
  },
  chnage: {
    fontSize: 10,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  bid_ask: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bid_ask_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bid_text: {
    color: BUY,
    fontWeight: 'bold',
    fontSize: 13,
  },
  ask_text: {
    color: SELL,
    fontWeight: 'bold',
    fontSize: 13,
  },
  bid: {
    color: BUY,
    fontWeight: 'bold',
    fontSize: 16,
  },
  ask: {
    color: SELL,
    fontWeight: 'bold',
    fontSize: 16,
  },
  detail: {
    flexDirection: 'row',
    flex: 0.8,
    justifyContent: 'space-around',
  },
  detailmainview: {
    justifyContent: 'space-around',
    flex: 1,
    alignItems: 'center',
  },
  high: {
    flex: 2,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#585858',
  },
  coma: {
    flex: 0.1,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#585858',
  },
  low: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#585858',
  },
  leftview: {
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
  },
  rightview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  paddinglefttext: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  buy_sell: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  buy_button: {
    height: 55,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Main_color,
    width: 150,
    borderRadius: 10,
  },
  sell_button: {
    height: 55,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SELL,
    width: 150,
    borderRadius: 10,
  },
  buy_sell_text: {
    fontSize: 22,
    fontFamily: 'Gadugi-bold',
    color: '#fff',
  },
});
