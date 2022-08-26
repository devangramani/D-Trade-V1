import {Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';
import {Main_color} from '../../Component/Theme/Color';
import {connect} from 'react-redux';
const {height} = Dimensions.get('screen');

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class CustomDrawer extends Component {
  Navigation(a) {
    this.props.navigation.navigate(a);
  }
  render() {
    const index = this.props.state.index;
    return (
      <View
        style={{
          height: height,
        }}>
        <View
          style={{
            flex: 2,
            backgroundColor: this.props.theme,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <View
            style={{
              height: height / 15,
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: 20,
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.closeDrawer()}>
              <Image
                source={require('../../Component/Photos/close.gif')}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <TouchableOpacity
              style={{
                height: 180,
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 20,
                width: 180,
              }}>
              <Image
                source={require('../../Component/Photos/Photo/Logo.png')}
                style={{height: 100, width: 100}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 3.3, padding: 15}}>
          {this.props.state.routes.map((i, t) => {
            return (
              <TouchableOpacity
                key={t}
                onPress={() => this.Navigation(i.name)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: index == t ? this.props.theme : '#f2f2f2',
                  padding: 7,
                  borderRadius: 10,
                  marginBottom: 10,
                }}>
                {t == 0 ? (
                  <Entypo
                    name="bookmarks"
                    size={30}
                    color={index == t ? '#ffffff' : this.props.theme}
                  />
                ) : t == 1 ? (
                  <AntDesign
                    size={30}
                    name="barchart"
                    color={index == t ? '#ffffff' : this.props.theme}
                  />
                ) : t == 2 ? (
                  <Feather
                    size={30}
                    name="mail"
                    color={index == t ? '#ffffff' : this.props.theme}
                  />
                ) : t == 3 ? (
                  <MaterialCommunityIcons
                    name="account-circle"
                    size={30}
                    color={index == t ? '#ffffff' : this.props.theme}
                  />
                ) : null}

                <Text
                  style={{
                    marginLeft: 10,
                    fontWeight: 'bold',
                    color: index == t ? '#ffffff' : this.props.theme,
                  }}>
                  {i.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const MapStateToProps = state => {
  return {
    theme: state.theme,
  };
};

export default connect(MapStateToProps)(CustomDrawer);
