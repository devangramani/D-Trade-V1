import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import Backend from '../../../../Backend/Backend';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {BUY, Main_color, Red} from '../../../../Theme/Color';
const backend = new Backend();

function ScriptCard(props) {
  const [loading, setLoading] = useState(false);

  const _Add_Script = item => {
    setLoading(true);
    let data = {
      id: props.username_id,
      token: props.token,
      server_code: props.server_code,
      script_id: item.id,
      main_script_id: item.script_id,
      type: item.script_type,
    };
    backend.add_script(data).then(r => {
      setLoading(false);
      if (r.error == 'False') {
        props.reload();
      } else {
        alert(r.message);
      }
    });
  };

  const _delete_script = item => {
    setLoading(true);
    let data = {
      id: props.username_id,
      token: props.token,
      server_code: props.server_code,
      script_id: item.id,
      main_script_id: item.script_id,
      type: item.script_type,
    };
    backend.delete_script(data).then(r => {
      setLoading(false);
      if (r.error == 'False') {
        props.reload();
      } else {
        props.reload();
      }
    });
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        key={props.item.id}
        style={{
          flex: 1,
          flexDirection: 'row',
          height: 60,
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: '#ffffff',
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
          marginBottom: 7,
          elevation: 3,
        }}>
        <View style={{flex: 4, paddingLeft: 20}}>
          <Text style={{color: props.theme, fontWeight: 'bold', fontSize: 17}}>
            {props.item.symbol_display}
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: 'gray',
              fontWeight: 'bold',
              fontSize: 11,
            }}>
            Expiry :{' ' + moment(props.item.expiry_date).format('DD MMM YY')}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {props.add == 1 ? (
            <TouchableOpacity
              onPress={() => (loading ? null : _Add_Script(props.item))}
              style={{
                height: 55,
                width: 55,
                elevation: 5,
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
              }}>
              {loading ? (
                <ActivityIndicator size={'small'} color={Red} />
              ) : (
                <AntDesign size={40} name={'plus'} color={BUY} />
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => (loading ? null : _delete_script(props.item))}
              style={{
                height: 55,
                width: 55,
                elevation: 5,
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
              }}>
              {loading ? (
                <ActivityIndicator size={'small'} color={Red} />
              ) : (
                <AntDesign size={30} name={'delete'} color={Red} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
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

export default connect(MapStateToProps)(ScriptCard);
