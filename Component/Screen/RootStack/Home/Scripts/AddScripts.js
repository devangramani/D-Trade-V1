import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {Component} from 'react';
import {Gray, Main_color} from '../../../../Theme/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Backend from '../../../../Backend/Backend';
import ScriptCard from './ScriptCard';
import {connect} from 'react-redux';
import CustomAlert from '../../../../CustomAlert/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
const backend = new Backend();

class AddScripts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      scripts: [],
      scripts_filter: [],
      watclist: [],
      forex: [],
      search: '',
      loading: true,
      modal: false,
      type: 0,
      text: '',
      userdata: '',
      serach_script: [],
    };
  }
  componentDidMount() {
    this.load_script();
    this.load_watchlist();
    AsyncStorage.getItem('username_data').then(r => {
      this.setState({userdata: JSON.parse(r)});
    });
  }

  load_watchlist() {
    this.setState({
      loading: true,
    });
    let data = {
      token: this.props.token,
      id: this.props.username_id,
      server_code: this.props.server_code,
    };

    backend.load_watchlist(data).then(r => {
      this.setState({
        loading: false,
        watclist: [],
      });
      if (r.error == 'False') {
        r.fut.map(i => {
          this.state.watclist.push(i);
        });
        r.mcx.map(i => {
          this.state.watclist.push(i);
        });
        r.fo.map(i => {
          this.state.watclist.push(i);
        });
      } else {
        this.setState({
          loading: false,
          modal: true,
          type: 3,
          text: r.message,
        });
      }
    });
  }

  load_script() {
    let data = {
      id: this.props.username_id,
      token: this.props.token,
      server_code: this.props.server_code,
    };
    backend.load_script(data).then(r => {
      this.setState({
        scripts: [],
        scripts_filter: [],
        search: '',
        loading: false,
      });
      if (r.error == 'False') {
        r.fut.map(i => {
          this.state.scripts.push(i);
          this.state.scripts_filter.push(i);
        });
        r.fo.map(i => {
          this.state.scripts.push(i);
          this.state.scripts_filter.push(i);
        });
        r.mcx.map(i => {
          this.state.scripts.push(i);
          this.state.scripts_filter.push(i);
        });
      } else {
        alert(r.message);
      }
    });
  }

  _Search_script(text) {
    this.setState({
      search: text,
    });
    if (text.length == 0) {
      this.setState({scripts: this.state.scripts_filter});
      this.setState({serach_script: []});
    } else {
      let data = [];
      data = this.state.scripts_filter.filter(x => {
        return x.script_type == 'fo'
          ? x.symbol_display.toLowerCase().includes(text.toLowerCase())
          : x.name.toLowerCase().includes(text.toLowerCase());
      });
      this.setState({
        serach_script: data,
      });
    }
  }

  Added(a) {
    if (a == 'Script Added') {
      this.setState({
        modal: true,
        type: 1,
        text: a,
      });
    } else {
      this.setState({
        modal: true,
        type: 3,
        text: a,
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: this.props.theme}}>
        <Modal
          animationType="slide"
          visible={this.state.modal}
          transparent={true}
          style={{flex: 1}}
          onRequestClose={() => {
            this.setState({modal: false});
          }}>
          <CustomAlert
            modal={() => this.setState({modal: false})}
            type={this.state.type}
            text={this.state.text}
          />
        </Modal>
        <View
          style={{
            height: 55,
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              width: 55,
            }}>
            <AntDesign name="arrowleft" color={Main_color} size={30} />
          </TouchableOpacity>
          <View
            style={{
              height: 45,
              borderBottomWidth: 1,
              borderBottomColor: '#ffffff',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              value={this.state.search}
              onChangeText={t => {
                this._Search_script(t);
              }}
              placeholder="Search...."
              placeholderTextColor={Gray}
              style={{
                width: '75%',
                fontWeight: 'bold',
                fontSize: 15,
                color: '#000000',
                borderBottomWidth: 2,
                borderBottomColor: Main_color,
              }}
            />
            <TouchableOpacity
              style={{
                width: 55,
                width: 55,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                this.setState({search: ''});
                this.setState({serach_script: []});
                Keyboard.dismiss();
                this.load_script();
              }}>
              {this.state.search.length > 1 ? (
                <AntDesign name="close" color={Main_color} size={30} />
              ) : (
                <AntDesign name="search1" color={Main_color} size={30} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#f2f2f2',
          }}>
          {this.state.serach_script.length > 0 ? (
            <FlatList
              data={this.state.serach_script}
              contentContainerStyle={{padding: 10}}
              renderItem={({item, index}) => {
                return (
                  <ScriptCard
                    item={item}
                    index={index}
                    reload={() => this.load_watchlist()}
                    add={1}
                  />
                );
              }}
            />
          ) : null}

          {this.state.serach_script.length <= 0 ? (
            this.state.loading == true ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size={'large'} color={Main_color} />
              </View>
            ) : this.state.watclist.length < 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: Main_color, fontWeight: 'bold'}}>
                  No Script Found
                </Text>
              </View>
            ) : (
              <FlatList
                data={this.state.watclist}
                contentContainerStyle={{padding: 10}}
                renderItem={({item, index}) => {
                  return (
                    <ScriptCard
                      item={item}
                      index={index}
                      reload={() => this.load_watchlist()}
                    />
                  );
                }}
              />
            )
          ) : null}
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
    theme: state.theme,
  };
};

export default connect(MapStateToProps)(AddScripts);
