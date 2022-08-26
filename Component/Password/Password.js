import {
  View,
  Text,
  Keyboard,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Password() {
  const [passwords, setPassword] = useState('');
  const [passwordlength, setPasswordlength] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('app_password').then(r => {
      setPassword(r);
    });
  }, []);

  const password = () => {};

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Image
          source={require('../Photos/Photo/Logo.png')}
          style={{height: 50, width: 50, marginBottom: 15}}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 22,
            marginBottom: 5,
            color: '#000',
          }}>
          Enter your PIN
        </Text>
        <Text style={{alignSelf: 'center', width: '70%', textAlign: 'center'}}>
          Enter the secure PIN to Access your account.
        </Text>
      </View>
      <View style={{alignSelf: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={{
              backgroundColor: '#ffffff',
              height: 25,
              width: 25,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: 'gray',
              margin: 10,
              color: '#000000',
            }}
            maxLength={1}
          />
          <TextInput
            style={{
              backgroundColor: '#ffffff',
              height: 25,
              width: 25,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: 'gray',
              margin: 10,
              color: '#000000',
            }}
            maxLength={1}
          />
          <TextInput
            style={{
              backgroundColor: '#ffffff',
              height: 25,
              width: 25,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: 'gray',
              margin: 10,
              color: '#000000',
            }}
            maxLength={1}
          />
          <TextInput
            style={{
              backgroundColor: '#ffffff',
              height: 25,
              width: 25,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: 'gray',
              margin: 10,
              color: '#000000',
            }}
            maxLength={1}
          />
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={password('1')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}>
            <Text style={{fontSize: 22}}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={password('2')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22}}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={password('3')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22}}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={password('4')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}>
            <Text style={{fontSize: 22}}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={password('5')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22}}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={password('6')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22}}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={password('7')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}>
            <Text style={{fontSize: 22}}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={password('8')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22}}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={password('9')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22}}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={password('0')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22}}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={password('back')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome5 size={30} name="backspace" color={'#000000'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
