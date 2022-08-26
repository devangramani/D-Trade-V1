import React, {useEffect} from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {BUY, Main_color, SELL} from '../Theme/Color';
import {Completed, Error, Pending} from '../Photos/Photos';
function CustomAlert(props) {
  const type = props.type;
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={styles.centeredView}
        onPress={() => props.modal()}>
        <View style={styles.modalView}>
          <Image
            source={
              type == 1
                ? Completed
                : type == 2
                ? Completed
                : type == 3
                ? Error
                : type == 4
                ? Pending
                : type == 5
                ? Error
                : null
            }
            style={{padding: 10, height: 45, width: 45}}
          />
          <Text
            style={{
              marginTop: 10,
              color:
                type == 1
                  ? BUY
                  : type == 2
                  ? BUY
                  : type == 3
                  ? SELL
                  : type == 4
                  ? Main_color
                  : type == 5
                  ? SELL
                  : null,
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            {type == 1
              ? 'COMPLETED'
              : type == 2
              ? 'MODYFIED'
              : type == 3
              ? 'ALERT'
              : type == 4
              ? 'PENDING'
              : type == 5
              ? 'CANCELED'
              : null}
          </Text>
          <Text
            style={{
              marginTop: 2,
              color: '#585858',
              fontSize: 12,
              fontWeight: 'bold',
              width: '100%',
            }}>
            {props.text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default CustomAlert;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 35,
    paddingLeft: 70,
    paddingRight: 70,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
