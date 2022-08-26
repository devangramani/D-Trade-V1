import {View, Text, StatusBar, TouchableOpacity, Linking} from 'react-native';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
function Permissions(props) {
  useEffect(() => {
    changeNavigationBarColor(props.theme);
    StatusBar.setBackgroundColor(props.theme);
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => props.reload()}
        style={{
          position: 'absolute',
          top: 10,
          right: 20,
          height: 45,
          width: 45,
          zIndex: 99,
        }}>
        <AntDesign size={30} color={props.theme} name={'close'} />
      </TouchableOpacity>

      <Text
        style={{
          flex: 1,
          fontSize: 24,
          padding: 20,
          textAlign: 'left',
          fontWeight: 'bold',
          color: props.theme,
        }}>
        Location permissions are permanetly denied, Please enable it from app
        setting
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openSettings()}
        style={{
          margin: 10,
          backgroundColor: props.theme,
          padding: 15,
          borderRadius: 30,
          marginRight: 20,
          marginLeft: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold', color: '#ffffff', fontSize: 18}}>
          Open Setting
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const MapStateToProps = state => {
  return {
    theme: state.theme,
  };
};
export default connect(MapStateToProps)(Permissions);
