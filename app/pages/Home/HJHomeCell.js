'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TextInput
} from 'react-native';
export default class HomeListCell extends React.Component{
  render() {
    return (
      <View style={styles.cellStyle}>
        <Image/>

        <Text>
        </Text>

        <View>
          <Text>
          </Text>
          <View>
            <Image/>
            <Image/>
            <Text></Text>
          </View>
        </View>

        <View style={styles.cellLineStyle}>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    cellStyle:{
      backgroundColor:'blue',
      height:50
    },
    cellLineStyle:{
      backgroundColor:'#dddddd',
      height:10
    }

});
