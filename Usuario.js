import React, { Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Pressable} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TAB1 from "./Tab1";
import TAB2 from "./Tab2";
import TAB3 from "./Tab3";
import TAB4 from "./Tab4";
import { Ionicons} from "@expo/vector-icons";
export default class Usuario extends Component {
  constructor(props){
    super(props);
    this.state={
    };
  }

  render() {
    const Tab = createBottomTabNavigator();
    const { data } = this.props.route.params;
    return(
     <Tab.Navigator>
        <Tab.Screen  name="Inicio" component={TAB1} options={{
          headerShown:false,
          tabBarIcon: ({tintColor}) => (
          <Ionicons name='home' size={25} color="black" />
        ),
        tabBarLabelStyle: {
          color: 'black',
          fontSize: 12,
          fontWeight: 'bold'
        }
        
        }} />
        <Tab.Screen  name="Pilotos" component={TAB4} options={{
          headerShown:false,
          tabBarIcon: ({tintColor}) => (
          <Ionicons name="people" size={25} color="black" />
        ),
        tabBarLabelStyle: {
          color: 'black',
          fontSize: 12,
          fontWeight: 'bold'
        }
        
        }} />
        <Tab.Screen  name="Equipos" component={TAB3} options={{
          headerShown:false,
          tabBarIcon: ({tintColor}) => (
          <Ionicons name='car-sport' size={25} color="black" />
        ),
        tabBarLabelStyle: {
          color: 'black',
          fontSize: 12,
          fontWeight: 'bold'
        }
        
        }} />
        <Tab.Screen name="Perfil" component={TAB2} initialParams={{ data: data }} options={{
          headerShown:false,
          tabBarIcon: ({tintColor}) => (
          <Ionicons name='person' size={25} color="black" />
        ),
        tabBarLabelStyle: {
          color: 'black',
          fontSize: 12,
          fontWeight: 'bold'
        }
        }}/>
      </Tab.Navigator>
    );
  }
}
