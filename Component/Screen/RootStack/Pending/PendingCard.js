import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {BUY, Main_color, SELL} from '../../../Theme/Color';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import Backend from '../../../Backend/Backend';
import {connect} from 'react-redux';

const backend = new Backend();

function PendingCard(props) {
  const refRBSheet = useRef();
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [buylimitstop, setBuylimitstop] = useState(true);

  const Cancel = a => {
    if (a == 1) {
      setLoading(true);
      var data = {
        token: props.token,
        username: props.username,
        server_code: props.server_code,
        pending_id: props.item.item.id,
        id: props.username_id,
      };
      backend.pending_cancel(data).then(r => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        if (r.error == 'False') {
          props.load_trade();
          refRBSheet.current.close();
        } else {
          alert(r.message);
          refRBSheet.current.close();
        }
      });
    } else {
      Alert.alert('Are your sure?', 'Are you sure you want to cancel ?', [
        {
          text: 'Yes',
          onPress: () => {
            var data = {
              token: props.token,
              username: props.username,
              server_code: props.server_code,
              pending_id: props.item.item.id,
              id: props.username_id,
            };
            backend.pending_cancel(data).then(r => {
              setTimeout(() => {
                setLoading(false);
              }, 1000);

              if (r.error == 'False') {
                props.load_trade();
                refRBSheet.current.close();
              } else {
                alert(r.message);
                refRBSheet.current.close();
              }
            });
          },
        },
        {
          text: 'No',
        },
      ]);
    }
  };

  const Open = () => {
    setQty(JSON.stringify(props.item.item.qty));
    setPrice(JSON.stringify(props.item.item.at_price));
  };

  return (
    <>
      <TouchableOpacity
        key={props.item.item.id}
        onPress={() => refRBSheet.current.open()}
        style={{
          paddingLeft: 15,
          marginLeft: 10,
          marginRight: 10,
          paddingTop: 5,
          marginBottom: 5,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#EAF0FE',
          backgroundColor: '#ffffff',
          borderRadius: 15,
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
                fontSize: 18,
              }}>
              {props.item.item.symbol_display}
            </Text>
            <Text
              style={{fontSize: 10, color: props.theme, fontWeight: 'bold'}}>
              {moment(props.item.item.expiry_date).format('YY MMM DD')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginTop: 7,
            }}>
            <View style={{flex: 0}}>
              <Text
                style={{
                  fontSize: 12,
                  color: SELL,
                  fontWeight: 'bold',
                  backgroundColor: '#EAF0FE',
                  paddingRight: 4,
                  paddingLeft: 4,
                  padding: 3,
                }}>
                PENDING
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
              }}>
              {parseFloat(props.item.item.at_price).toFixed(2)}
            </Text>
            <Text
              style={{
                color: '#585858',
                fontWeight: 'bold',
                fontSize: 10,
              }}>
              {moment(props.item.item.date_created).format('DD-MM-YYYY')} |
              {moment(props.item.item.date_created).format('hh:mm:ss')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        closeOnPressBack={true}
        onOpen={Open}
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
              {props.item.item.symbol_display}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: props.theme,
                fontWeight: 'bold',
                marginTop: 7,
              }}>
              {moment(props.item.item.expiry_date).format('DD MMM YY')}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          <View style={{flex: 1}}>
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
                  color: props.theme,
                }}
                onChangeText={r => {
                  setQty(r);
                }}
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.fieldSet}>
              <Text style={styles.legend}>Price</Text>
              <TextInput
                value={price}
                keyboardType="number-pad"
                style={{
                  height: 45,
                  fontSize: 22,
                  width: '100%',
                  marginTop: 5,
                  color: props.theme,
                }}
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
            <TouchableOpacity
              onPress={Cancel}
              style={{
                alignSelf: 'center',
                marginTop: 20,
                height: 45,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
                CANCEL ORDER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </>
  );
}

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
    color: '#585858',
  },
});

const MapStateToProps = state => {
  return {
    token: state.token,
    username_id: state.username_id,
    server_code: state.server_code,
    username: state.username,
    theme: state.theme,
  };
};

export default connect(MapStateToProps)(PendingCard);
