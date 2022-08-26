import {
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {Switch} from 'react-native-switch';
import TopCard from './TopCard';
import BottomCard from './BottomCard';
import OtherCard from './OtherCard';
import Antdesign from 'react-native-vector-icons/AntDesign';
import {BUY, SELL} from '../../../../Theme/Color';
import {connect} from 'react-redux';
const {height} = Dimensions.get('screen');
class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buy_sell: this.props.route.params.buy_sell == 0 ? true : false,
      key: false,
    };
  }

  render() {
    return (
      <ScrollView style={{height: height, backgroundColor: '#fff'}}>
        <View
          style={{
            height: 55,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              height: 55,
              width: 55,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Antdesign size={32} name="arrowleft" color={this.props.theme} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({buy_sell: !this.state.buy_sell})}
            style={{
              height: 40,
              width: 110,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: this.state.buy_sell ? 'red' : 'green',
              marginRight: 10,
              borderRadius: 30,
            }}>
            <Switch
              value={this.state.buy_sell}
              onValueChange={val => this.setState({buy_sell: val})}
              disabled={false}
              activeText={'SELL'}
              inActiveText={'BUY'}
              backgroundActive={'red'}
              backgroundInactive={'green'}
              circleActiveColor={'#fff'}
              circleInActiveColor={'#fff'}
            />
          </TouchableOpacity>
        </View>
        {this.state.key ? null : (
          <TopCard
            item={this.props.route.params}
            navigation={this.props.navigation}
          />
        )}
        <View style={{flexDirection: 'row', padding: 10, paddingTop: 0}}>
          <OtherCard item={this.props.route.params.item} />
        </View>
        <BottomCard
          item={this.props.route.params}
          navigation={this.props.navigation}
          buy_sell_color={this.state.buy_sell}
          buy_sell={this.state.buy_sell}
        />
      </ScrollView>
    );
  }
}

const MapStateToProps = state => {
  return {
    token: state.token,
    username_id: state.username_id,
    server_code: state.server_code,
    theme: state.theme,
  };
};

export default connect(MapStateToProps)(Buy);
