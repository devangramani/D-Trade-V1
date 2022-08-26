import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CastomTop from './CastomTop';
import Fut from '../Screen/RootStack/Home/ScriptCard/Fut/Fut';
import Opt from '../Screen/RootStack/Home/ScriptCard/Opt/Opt';
import Mcx from '../Screen/RootStack/Home/ScriptCard/Mcx/Mcx';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createMaterialTopTabNavigator();
export default class TopStack extends Component {
  constructor() {
    super();
    this.state = {
      userdata: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('username_data').then(r => {
      this.setState({userdata: JSON.parse(r)});
    });
  }
  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: a => {},
        }}
        tabBar={props => <CastomTop {...props} />}>
        <Tab.Screen
          name="Fut"
          component={Fut}
          options={{
            tabBarLabel: 'NSE-FUT',
          }}
        />
        <Tab.Screen
          name="Mcx"
          component={Mcx}
          options={{
            tabBarLabel: 'MCX',
          }}
        />

        {this.state.userdata.fo == 1 ? (
          <Tab.Screen
            name="Opt"
            component={Opt}
            options={{
              tabBarLabel: 'NSE-OPT',
            }}
          />
        ) : null}
      </Tab.Navigator>
    );
  }
}
