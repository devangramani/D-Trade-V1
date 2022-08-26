import {
  Dimensions,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {Main_color} from '../../../../../Theme/Color';
import {Search} from '../../../../../Photos/Photos';
import ForeCard from './ForexCard';
import Backend from '../../../../../Backend/Backend';
import {connect} from 'react-redux';
const backend = new Backend();
const {Height, width} = Dimensions.get('screen');

class Forex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      token: props.token,
      id: props.username_id,
      server_code: props.server_code,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.load_watchlist();
    });
    this.load_watchlist();
  }

  load_watchlist() {
    let data = {
      token: this.state.token,
      id: this.state.username_id,
      server_code: this.state.server_code,
    };
    backend.load_watchlist(data).then(r => {
      return false;
      if (r.error == 'False') {
        this.setState({fut_data: r.fut});
      } else {
        alert(r.message);
      }
    });
  }

  search(t) {
    if (t.length == 0) {
    } else {
    }
  }

  render() {
    return (
      <View style={{backgroundColor: Main_color, flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
          }}>
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              height: 45,
              borderBottomWidth: 1,
              borderBottomColor: Main_color,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Image
                source={Search}
                style={{height: 20, width: 20, marginRight: 10}}
              />
            </TouchableOpacity>
            <TextInput
              value={this.state.search}
              onChange={t => {
                this.setState({search: t});
                this.search(t);
              }}
              placeholder="Search...."
              placeholderTextColor={Main_color}
              style={{width: '80%', color: '#000000'}}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AddScripts')}>
              <Image
                source={Search}
                style={{height: 20, width: 20, marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={{
              marginTop: 10,
            }}
            data={[]}
            renderItem={({item, index}) => {
              return <ForeCard />;
            }}
          />
        </View>
      </View>
    );
  }
}

const MapStateToProps = state => {
  return {
    token: state.token,
    username_id: state.username_id,
    server_code: state.server_code,
    username: state.username,
  };
};

export default connect(MapStateToProps)(Forex);
