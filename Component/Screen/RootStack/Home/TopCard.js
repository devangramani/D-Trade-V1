import {Image, Text, View, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import SocketContect from './SocketContext';
import {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import {BUY, Main_color, SELL} from '../../../Theme/Color';
import TextTicker from 'react-native-text-ticker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';

function TopCard(props) {
  const [marke, setmarkeg] = useState(false);
  const [chng, setchng] = useState(0);
  const [niftyrate, setniftyrate] = useState(0);
  const [percent, setpercent] = useState(0);
  const [bankchng, setbankchng] = useState(0);
  const [bankniftyrate, setbankniftyrate] = useState(0);
  const [bankpercent, setbankpercent] = useState(0);
  const socket = useContext(SocketContect);
  var Ismouted = useIsFocused();

  const niftys = msg => {
    if (msg == null) {
    } else {
      if (msg.LTP - msg.Previous_Close !== chng) {
        if (Ismouted) {
          setchng(msg.LTP - msg.Previous_Close);
          setpercent(
            ((msg.LTP - msg.Previous_Close) / msg.Previous_Close) * 100,
          );
          setniftyrate(msg.LTP);
        }
      }
    }
  };
  const bankniftys = msg => {
    if (msg == null) {
    } else {
      if (msg.LTP - msg.Previous_Close !== bankchng) {
        if (Ismouted) {
          setbankchng(msg.LTP - msg.Previous_Close);
          setbankpercent(
            ((msg.LTP - msg.Previous_Close) / msg.Previous_Close) * 100,
          );
          setbankniftyrate(msg.LTP);
        }
      }
    }
  };
  useEffect(() => {
    socket.emit('giverate', 'nifty');
    socket.emit('giverate', 'banknifty');

    socket.on('nifty', niftys);

    socket.on('banknifty', bankniftys);
    return () => {
      socket.off('nifty', niftys);

      socket.off('banknifty', bankniftys);
    };
  }, [Ismouted]);

  return (
    <View style={top.mainview}>
      {marke == true ? (
        <TextTicker
          style={top.marke}
          duration={20000}
          loop
          repeatSpacer={50}
          marqueeDelay={3000}>
          {
            'hihih hihih hihih  hihih hihih hihih  hihih hihih hihih hihih hihih hihih hihih  hihih hihih hihih hihih hihih'
          }
        </TextTicker>
      ) : null}

      <View style={top.topcardmain}>
        <View
          style={[
            top.toptextcard,
            {
              padding: marke == true ? 5 : 10,
            },
          ]}>
          <View style={top.card}>
            <View style={top.nameview}>
              <Text style={[top.textcard, {fontSize: marke == true ? 12 : 18}]}>
                NIFTY 50
              </Text>
            </View>
            <View style={top.cardmainview}>
              <Text
                style={[
                  top.toptext,
                  {
                    color: chng > 0 ? BUY : SELL,
                    fontSize: marke == true ? 16 : 18,
                  },
                ]}>
                {parseFloat(niftyrate).toFixed(2)}
              </Text>
              <View>
                <AntDesign
                  name={chng > 0 ? 'caretup' : 'caretdown'}
                  style={[top.icon, {color: chng > 0 ? BUY : SELL}]}
                />
              </View>
            </View>
            <View style={top.bottomview}>
              <Text
                style={[
                  top.bottomtext,
                  {
                    color: chng > 0 ? BUY : SELL,
                    fontSize: marke == true ? 14 : 12,
                  },
                ]}>
                {parseFloat(chng).toFixed(2)}
              </Text>
              <Text
                style={[
                  top.bottomtext,
                  {
                    color: chng > 0 ? BUY : SELL,
                    fontSize: marke == true ? 12 : 12,
                  },
                ]}>
                {'(' + parseFloat(percent).toFixed(2) + '%)'}
              </Text>
            </View>
          </View>
        </View>
        <View style={[top.toptextcard, {padding: marke == true ? 5 : 10}]}>
          <View style={top.card}>
            <View style={top.nameview}>
              <Text style={[top.textcard, {fontSize: marke == true ? 12 : 18}]}>
                BANKNIFTY
              </Text>
            </View>
            <View style={top.cardmainview}>
              <Text
                style={[
                  top.toptext,
                  {
                    color: bankchng > 0 ? BUY : SELL,
                    fontSize: marke == true ? 16 : 18,
                  },
                ]}>
                {parseFloat(bankniftyrate).toFixed(2)}
              </Text>
              <View>
                <AntDesign
                  name={bankchng > 0 ? 'caretup' : 'caretdown'}
                  style={[top.icon, {color: bankchng > 0 ? BUY : SELL}]}
                />
              </View>
            </View>
            <View style={top.bottomview}>
              <Text
                style={[
                  top.bottomtext,
                  {
                    color: bankchng > 0 ? BUY : SELL,
                  },
                ]}>
                {parseFloat(bankchng).toFixed(2)}
              </Text>
              <Text
                style={[
                  top.bottomtext,
                  {
                    color: bankchng > 0 ? BUY : SELL,
                  },
                ]}>
                {'(' + parseFloat(bankpercent).toFixed(2) + '%)'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const MapStateToProps = state => {
  return {
    theme: state.theme,
  };
};
export default connect(MapStateToProps)(TopCard);

const top = StyleSheet.create({
  mainview: {
    flex: 1.2,
  },
  marke: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Main_color,
  },
  topcardmain: {
    flex: 1,
    flexDirection: 'row',
  },
  toptextcard: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
  },
  nameview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textcard: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  icon: {
    fontSize: 22,
  },
  cardmainview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  toptext: {
    fontSize: 20,
    marginRight: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'none',
    flex: 1,
  },
  bottomtext: {
    fontSize: 12,
    marginRight: 5,
    fontWeight: '500',
    color: '#fff',
  },
});
