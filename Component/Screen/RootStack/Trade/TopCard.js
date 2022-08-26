import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {BUY, Main_color, SELL} from '../../../Theme/Color';
import {connect} from 'react-redux';

function TopCard(props) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 12,
            color: '#000000',
          }}>
          Profit/Loss
        </Text>
        <Text
          style={{
            color: props.pl > 0 ? BUY : SELL,
            fontSize: 22,
            fontWeight: 'bold',
          }}>
          {parseFloat(props.pl).toFixed(2)}
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 12,
            color: '#000000',
          }}>
          Commission
        </Text>
        <Text
          style={{
            color: props.commission > 0 ? BUY : SELL,
            fontSize: 22,
            fontWeight: 'bold',
          }}>
          {parseFloat(props.commission).toFixed(2)}
        </Text>
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
