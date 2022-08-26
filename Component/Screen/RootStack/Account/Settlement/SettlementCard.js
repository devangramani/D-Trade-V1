import {Text, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {BUY, Main_color, SELL} from '../../../../Theme/Color';
import moment from 'moment';

export default class SettlementCard extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  render() {
    const i = this.props.item.item;
    return (
      <>
        <TouchableOpacity
          onPress={() => this.setState({show: !this.state.show})}
          style={{
            flexDirection: 'row',
            flex: 1,
            borderBottomColor: 'gray',
            backgroundColor: '#ffffff',
            borderRadius: 10,
            padding: 10,
            marginBottom: 5,
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: BUY, fontWeight: 'bold'}}>
              {parseFloat(i.deposit).toFixed(2)}
            </Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: SELL, fontWeight: 'bold'}}>
              {parseFloat(i.withdrawal).toFixed(2)}
            </Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#585858', fontWeight: 'bold'}}>
              {parseFloat(i.balance).toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
        {this.state.show == true ? (
          <View
            style={{
              padding: 7,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              marginBottom: 5,
              borderRadius: 10,
            }}>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: Main_color,
                fontWeight: 'bold',
              }}>
              {i.remarks}
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: Main_color,
                fontWeight: 'bold',
              }}>
              {moment(i.date_created).format('DD-MM-YYYY hh:mm:ss')}
            </Text>
          </View>
        ) : null}
      </>
    );
  }
}
