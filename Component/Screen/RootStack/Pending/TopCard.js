import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {BUY, Main_color, SELL} from '../../../Theme/Color';
import {connect} from 'react-redux';

function TopCard(props) {
  return (
    <View
      style={{
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 5,
          width: '100%',
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 5,
            width: '100%',
            paddingBottom: 10,
            flex: 1,
          }}
          onPress={() => props.pending_filter()}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 14,
              color: SELL,
            }}>
            Pending Order : {props.pending}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.success_filter()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 5,
            width: '100%',
            paddingBottom: 10,
            flex: 1,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 14,
              color: BUY,
            }}>
            Success Order : {props.success}
          </Text>
        </TouchableOpacity>
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
