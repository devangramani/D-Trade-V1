import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Main_color} from '../../../../Theme/Color';
import CustomAlert from '../../../../CustomAlert/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backend from '../../../../Backend/Backend';
import SoundPlayer from 'react-native-sound-player';
import {connect} from 'react-redux';
const backend = new Backend();

function BottomCard(props) {
  const [selected, setSelcted] = useState(1);
  const [qty, setqty] = useState('');
  const [atprice, setAtprice] = useState('');
  const [loading, setLoading] = useState(false);
  const [buylimitstop, setBuylimitstop] = useState(true);
  const [sound, setSound] = useState(false);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(1);
  const [text, setText] = useState('');
  const [userdata, setUserdata] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('sound').then(r => {
      if (r == null) {
        setSound(true);
      } else if (r == 0) {
        setSound(false);
      } else if (r == 1) {
        setSound(true);
      }
    });
    AsyncStorage.getItem('username_data').then(r => {
      setUserdata(JSON.parse(r));
    });
  }, []);

  const _send_order = () => {
    if (selected == 1) {
      if (qty == '') {
        setModal(true);
        setType(3);
        setText('Invalid Quantity');
        {
          sound == true ? SoundPlayer.playSoundFile('beep', 'mp3') : null;
        }
      } else {
        setLoading(true);
        var data = {
          script_id: props.item.item.script_id,
          qty_order: qty,
          type: props.buy_sell == true ? 0 : 1,
          token: props.token,
          username: props.username,
          server_code: props.server_code,
          script_type: props.item.item.script_type,
          id: props.username_id,
        };
        backend.trade(data).then(r => {
          setTimeout(() => {
            setLoading(false);
            setqty('');
          }, 1000);
          if (r.error == 'False') {
            SoundPlayer.playSoundFile('newtone', 'mp3');
            setModal(true);
            setType(1);
            setText(r.message);
          } else {
            SoundPlayer.playSoundFile('beep', 'mp3');
            setModal(true);
            setType(3);
            setText(r.message);
          }
        });
      }
    } else if (selected == 2) {
      if (qty == '' || atprice == '') {
        setModal(true);
        setType(3);
        setText('Chcek Quantity and Price');
        {
          sound == true ? SoundPlayer.playSoundFile('beep', 'mp3') : null;
        }
      } else {
        setLoading(true);
        var data = {
          script_id: props.item.item.script_id,
          qty_order: qty,
          type: props.buy_sell == true ? 0 : 1,
          token: props.token,
          username: props.username,
          buylimitstop: buylimitstop,
          at_price: atprice,
          limit_type: selected == 2 ? 0 : 1,
          server_code: props.server_code,
          id: props.username_id,
        };
        backend.pending(data).then(r => {
          setTimeout(() => {
            setLoading(false);
            setqty('');
            setAtprice('');
          }, 1000);

          if (r.error == 'False') {
            {
              sound == true
                ? SoundPlayer.playSoundFile('newtone', 'mp3')
                : null;
            }
            setModal(true);
            setType(4);
            setText(r.message);
          } else {
            {
              sound == true ? SoundPlayer.playSoundFile('beep', 'mp3') : null;
            }
            setModal(true);
            setType(3);
            setText(r.message);
          }
        });
      }
    } else if (selected == 3) {
      if (qty == '' || atprice == '') {
        setModal(true);
        setType(3);
        setText('Chcek Quantity and Price');
        {
          sound == true ? SoundPlayer.playSoundFile('beep', 'mp3') : null;
        }
      } else {
        setLoading(true);
        var data = {
          script_id: props.item.item.script_id,
          qty_order: qty,
          type: props.buy_sell == true ? 0 : 1,
          token: props.token,
          username: props.username,
          buylimitstop: buylimitstop,
          at_price: atprice,
          limit_type: selected == 3 ? 1 : 0,
          server_code: props.server_code,
          id: props.username_id,
        };
        backend.pending(data).then(r => {
          setTimeout(() => {
            setLoading(false);
            setqty('');
            setAtprice('');
          }, 1000);
          if (r.error == 'False') {
            {
              sound == true
                ? SoundPlayer.playSoundFile('newtone', 'mp3')
                : null;
            }
            setModal(true);
            setType(4);
            setText(r.message);
          } else {
            {
              sound == true ? SoundPlayer.playSoundFile('beep', 'mp3') : null;
            }
            setModal(true);
            setType(3);
            setText(r.message);
          }
        });
      }
    } else {
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={modal}
          transparent={true}
          style={{flex: 1}}
          onRequestClose={() => {
            setModal(true);
          }}>
          <CustomAlert modal={() => setModal(false)} type={type} text={text} />
        </Modal>
        <View style={styles.header}>
          <View style={styles.selcter}>
            <TouchableOpacity
              onPress={() => setSelcted(1)}
              style={[
                styles.textselect,
                {
                  backgroundColor:
                    selected == 1 ? (props.buy_sell ? 'green' : 'red') : '#fff',
                },
              ]}>
              <Text
                style={[
                  styles.selctertext,
                  {
                    color:
                      selected == 1
                        ? '#fff'
                        : props.buy_sell
                        ? Main_color
                        : Main_color,
                  },
                ]}>
                Market
              </Text>
            </TouchableOpacity>
          </View>
          {props.item.item.script_type == 'fo' ? null : (
            <>
              <View style={styles.selcter}>
                <TouchableOpacity
                  onPress={() => setSelcted(2)}
                  style={[
                    styles.textselect,
                    {
                      backgroundColor:
                        selected == 2
                          ? props.buy_sell
                            ? 'green'
                            : 'red'
                          : '#fff',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.selctertext,
                      {
                        color:
                          selected == 2
                            ? '#fff'
                            : props.buy_sell
                            ? Main_color
                            : Main_color,
                      },
                    ]}>
                    Limit
                  </Text>
                </TouchableOpacity>
              </View>
              {userdata.limit_type == 1 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => setSelcted(3)}
                    style={[
                      styles.textselect,
                      {
                        backgroundColor:
                          selected == 3
                            ? props.buy_sell
                              ? 'green'
                              : 'red'
                            : '#fff',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.selctertext,
                        {
                          color:
                            selected == 3
                              ? '#fff'
                              : props.buy_sell
                              ? Main_color
                              : Main_color,
                        },
                      ]}>
                      SL
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
          )}
        </View>
        <View style={styles.mainview}>
          <View
            style={[
              styles.fieldSet,
              {borderColor: props.buy_sell ? 'green' : 'red'},
            ]}>
            <Text
              style={[
                styles.legend,
                {color: props.buy_sell ? 'green' : 'red'},
              ]}>
              Quantity
            </Text>
            <TextInput
              value={qty}
              keyboardType="number-pad"
              placeholder={
                props.item.item.script_type == 'mcx' ||
                props.item.item.script_type == 'fo'
                  ? 'Enter Lot'
                  : 'Enter Quantity'
              }
              style={styles.input}
              onChangeText={t => {
                setqty(t);
              }}
            />
          </View>
          {selected == 1 ? null : (
            <View
              style={[
                styles.fieldSet,
                {borderColor: props.buy_sell ? 'green' : 'red'},
              ]}>
              <Text
                style={[
                  styles.legend,
                  {color: props.buy_sell ? 'green' : 'red'},
                ]}>
                Price
              </Text>
              <TextInput
                value={atprice}
                keyboardType="number-pad"
                placeholder="Enter Price "
                style={styles.input}
                onChangeText={t => {
                  setAtprice(t);
                }}
              />
            </View>
          )}
          <TouchableOpacity
            onPress={() => (loading ? null : _send_order())}
            style={[
              styles.submit,
              {backgroundColor: props.buy_sell ? 'green' : 'red'},
            ]}>
            {loading ? (
              <ActivityIndicator size={'small'} color={'#ffffff'} />
            ) : (
              <Text style={styles.submittext}>
                {props.buy_sell == 1 ? 'BUY' : 'SELL'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
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

export default connect(MapStateToProps)(BottomCard);

const styles = StyleSheet.create({
  fieldSet: {
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    height: 55,
    paddingTop: 5,
    justifyContent: 'center',
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 14,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 40,
    flexDirection: 'row',
  },
  selcter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textselect: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 70,
    borderRadius: 5,
  },
  selctertext: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  input: {
    width: '100%',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  submit: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 55,
    width: 170,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submittext: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  mainview: {
    flex: 1,
    padding: 20,
  },
});
