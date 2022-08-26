import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BUY, Main_color, SELL} from '../../../Theme/Color';
import {Icon} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backend from '../../../Backend/Backend';
import SoundPlayer from 'react-native-sound-player';
import CustomAlert from '../../../CustomAlert/CustomAlert';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
const backend = new Backend();

const SqOff = props => {
  const [qty, setQty] = useState(
    JSON.stringify(
      props.item.fut_mcx == 0
        ? props.item.qty
        : props.item.qty / props.item.lot_size,
    ),
  );
  const [sound, setSound] = useState(true);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(0);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('sound').then(r => {
      let s = sound == 0 ? false : true;
      if (r == null) {
        setSound(true);
      } else {
        setSound(s);
      }
    });
  }, []);

  const sqoff = () => {
    if (qty == '') {
      setModal(true);
      setType(3);
      setText('Invaldi Oty');
    } else {
      setLoading(true);
      var data = {
        script_id: props.item.script_id,
        qty_order: qty,
        type: props.item.buy_sale == 1 ? 0 : 1,
        token: props.token,
        username: props.username,
        server_code: props.server_code,
        script_type: props.item.script_type,
      };
      backend.trade(data).then(r => {
        setTimeout(() => {
          setLoading(false);
          setQty('');
        }, 1000);
        if (r.error == 'False') {
          SoundPlayer.playSoundFile('newtone', 'mp3');
          setModal(true);
          setType(1);
          setText(r.message);
          setTimeout(() => {
            props.close();
          }, 2000);
        } else {
          SoundPlayer.playSoundFile('beep', 'mp3');
          setModal(true);
          setType(3);
          setText(r.message);
          setTimeout(() => {
            props.close();
          }, 2000);
        }
      });
    }
  };
  return (
    <View>
      <Modal
        animationType="slide"
        visible={modal}
        transparent={true}
        style={{flex: 1}}
        onRequestClose={() => {
          setModal(false);
        }}>
        <CustomAlert modal={() => setModal(false)} type={type} text={text} />
      </Modal>
      <View
        style={{
          height: 65,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#EAF0FE',
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: 20,
            }}>
            <Text style={{color: Main_color, fontSize: 18, fontWeight: 'bold'}}>
              {props.item.symbol}
            </Text>
            <Text
              style={{
                color: props.item.buy_sale == 0 ? BUY : SELL,
                fontSize: 12,
                marginLeft: 6,
                fontWeight: 'bold',
                marginTop: 3,
              }}>
              {props.item.buy_sale == 0 ? 'BUY' : 'SELL'}
              {props.item.fut_mcx == 0
                ? ' (' + props.item.qty + ') '
                : ' (' + props.item.qty / props.item.lot_size + ') '}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginBottom: 5,
              paddingLeft: 20,
            }}>
            <Text style={{fontWeight: 'bold', color: '#585858'}}>
              S :{props.item.rate}
            </Text>
            <AntDesign name="arrowright" size={30} color={props.theme} />
            <Text style={{fontWeight: 'bold', color: '#585858'}}>
              C : {props.bid}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: 22,
              marginRight: 20,
              fontWeight: 'bold',
              color: parseFloat(props.pf).toFixed(2) < 0 ? SELL : BUY,
            }}>
            {parseFloat(props.pf).toFixed(2)}
          </Text>
        </View>
      </View>
      <View>
        <View style={{marginTop: 40}}>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Qunitity</Text>
            <TextInput
              value={qty}
              keyboardType="number-pad"
              style={{
                height: 45,
                width: '100%',
                fontSize: 22,
                marginTop: 5,
                color: SELL,
                fontWeight: 'bold',
              }}
              onChangeText={r => {
                setQty(r);
              }}
            />
          </View>
          {loading == true ? (
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                marginTop: 40,
                height: 55,
                width: 200,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: SELL,
                borderRadius: 10,
              }}>
              <ActivityIndicator size={'large'} color={'#fff'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={sqoff}
              style={{
                alignSelf: 'center',
                marginTop: 40,
                height: 55,
                width: 200,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: SELL,
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                Sq. Off
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const MapStateToProps = state => {
  return {
    token: state.token,
    username_id: state.username_id,
    server_code: state.server_code,
    username: state.username,
  };
};

export default connect(MapStateToProps)(SqOff);

const styles = StyleSheet.create({
  fieldSet: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
    alignItems: 'center',
    borderColor: '#585858',
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center',
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
    color: SELL,
  },
});
