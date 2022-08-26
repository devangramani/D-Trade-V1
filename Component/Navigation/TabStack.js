import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screen/RootStack/Home/Home';
import Trade from '../Screen/RootStack/Trade/Trade';
import Position from '../Screen/RootStack/Position/Position';
import Pending from '../Screen/RootStack/Pending/Pending';
import Account from '../Screen/RootStack/Account/Account';
import Notification from '../Screen/RootStack/Notification/Notification';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {Main_color} from '../Theme/Color';
const Tab = createBottomTabNavigator();

class TabStack extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarAllowFontScaling: true,
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0.8,
                      marginBottom: 50,
                      elevation: 3,
                    }}>
                    <Entypo
                      name="bookmarks"
                      size={30}
                      color={Main_color}
                      style={{opacity: 1}}
                    />

                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: Main_color,
                        opacity: 1,
                      }}>
                      Watchlist
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo name="bookmarks" size={30} color={'gray'} />

                  <Text
                    style={{fontSize: 10, fontWeight: 'bold', color: 'gray'}}>
                    Watchlist
                  </Text>
                </View>
              ),
          }}
        />
        <Tab.Screen
          name="Position"
          component={Position}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0.8,
                      marginBottom: 50,
                      elevation: 3,
                    }}>
                    <Feather
                      name="mail"
                      size={30}
                      color={Main_color}
                      style={{opacity: 1}}
                    />

                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: Main_color,
                        opacity: 1,
                      }}>
                      Position
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Feather name="mail" size={30} color={'gray'} />

                  <Text
                    style={{fontSize: 10, fontWeight: 'bold', color: 'gray'}}>
                    Position
                  </Text>
                </View>
              ),
          }}
        />
        <Tab.Screen
          name="Trade"
          component={Trade}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0.8,
                      marginBottom: 50,
                      elevation: 3,
                    }}>
                    <AntDesign
                      name="barchart"
                      size={30}
                      color={Main_color}
                      style={{opacity: 1}}
                    />

                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: Main_color,
                        opacity: 1,
                      }}>
                      Trade
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="barchart" size={30} color={'gray'} />

                  <Text
                    style={{fontSize: 10, fontWeight: 'bold', color: 'gray'}}>
                    Trade
                  </Text>
                </View>
              ),
          }}
        />

        <Tab.Screen
          name="Pending"
          component={Pending}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0.8,
                      marginBottom: 50,
                      elevation: 3,
                    }}>
                    <AntDesign
                      name="book"
                      size={30}
                      color={Main_color}
                      style={{opacity: 1}}
                    />

                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: Main_color,
                        opacity: 1,
                      }}>
                      Pending
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="book" size={30} color={'gray'} />

                  <Text
                    style={{fontSize: 10, fontWeight: 'bold', color: 'gray'}}>
                    Pending
                  </Text>
                </View>
              ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0.8,
                      marginBottom: 50,
                      elevation: 3,
                    }}>
                    <MaterialCommunityIcons
                      name="account-circle"
                      size={30}
                      color={Main_color}
                      style={{opacity: 1}}
                    />

                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: Main_color,
                        opacity: 1,
                      }}>
                      Account
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="account-circle"
                    size={30}
                    color={'gray'}
                  />

                  <Text
                    style={{fontSize: 10, fontWeight: 'bold', color: 'gray'}}>
                    Account
                  </Text>
                </View>
              ),
          }}
        />
        <Tab.Screen
          name="News"
          component={Notification}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0.8,
                      marginBottom: 50,
                      elevation: 3,
                    }}>
                    <AntDesign
                      name="profile"
                      size={30}
                      color={Main_color}
                      style={{opacity: 1}}
                    />

                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: Main_color,
                        opacity: 1,
                      }}>
                      News
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="profile" size={30} color={'gray'} />

                  <Text
                    style={{fontSize: 10, fontWeight: 'bold', color: 'gray'}}>
                    News
                  </Text>
                </View>
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const MapStateToProps = state => {
  return {
    theme: state.theme,
  };
};

export default connect(MapStateToProps)(TabStack);
