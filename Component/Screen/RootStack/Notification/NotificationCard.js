import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {Main_color} from '../../../Theme/Color';
import moment from 'moment';

export default class NotificationCard extends Component {
  render() {
    const i = this.props.item;
    return (
      <View style={card.main}>
        <Text style={card.heading}>{i.heading}</Text>
        <Text style={card.text}>{i.text}</Text>
        <Text
          style={{
            marginTop: 10,
            fontWeight: '500',
            color: 'gray',
            fontSize: 12,
          }}>
          {moment(i.date_created).format('DD-MM-YYY hh:mm:ss A')}
        </Text>
      </View>
    );
  }
}

const card = StyleSheet.create({
  main: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Main_color,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'gray',
  },
});
