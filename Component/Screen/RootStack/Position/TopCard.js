import {View, Text, Dimensions, ScrollView} from 'react-native';
import React from 'react';
import {BUY, Main_color, SELL} from '../../../Theme/Color';
import {connect} from 'react-redux';
function TopCard(props) {
  var margin = 0;

  margin = parseFloat(props.balance) + parseFloat(props.total);

  margin = margin * props.multiplier;

  margin = parseFloat(margin) - parseFloat(props.limit);
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        flex: 1,
        backgroundColor: '#f2f2f2',
      }}>
      <View
        style={{
          flex: 1,
          borderRadius: 15,
          backgroundColor: '#ffffff',
          width: '100%',
          height: '100%',
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              paddingLeft: 10,
              fontWeight: 'bold',
              fontSize: 18,
              color: Main_color,
            }}>
            Live P/L
          </Text>
          <Text style={{flex: 1, textAlign: 'center', color: Main_color}}>
            :
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: 'right',
              paddingRight: 10,
              color: props.total > 0 ? BUY : SELL,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {parseFloat(props.total).toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            borderBottomWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              paddingLeft: 10,
              color: Main_color,
              fontWeight: 'bold',
            }}>
            Balance
          </Text>
          <Text style={{flex: 1, textAlign: 'center', color: Main_color}}>
            :
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: 'right',
              paddingRight: 10,
              fontWeight: 'bold',
            }}>
            {props.balance == 0 || props.balance == null
              ? '0'
              : parseFloat(props.balance).toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            borderBottomWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              paddingLeft: 10,
              color: Main_color,
              fontWeight: 'bold',
            }}>
            Booked P/L
          </Text>
          <Text style={{flex: 1, textAlign: 'center', color: Main_color}}>
            :
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: 'right',
              paddingRight: 10,
              fontWeight: 'bold',
              color: props.booked > 0 ? BUY : SELL,
            }}>
            {props.booked == 0 || props.booked == null
              ? '0'
              : parseFloat(props.booked).toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              paddingLeft: 10,
              color: Main_color,
              fontWeight: 'bold',
            }}>
            Margin Limit
          </Text>
          <Text style={{flex: 1, textAlign: 'center', color: Main_color}}>
            :
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: 'right',
              paddingRight: 10,
              fontWeight: 'bold',
            }}>
            {parseInt(margin)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const mapstatetoProps = state => {
  return {
    total: state.total,
    theme: state.theme,
  };
};
export default connect(mapstatetoProps)(TopCard);
