'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
} from 'react-native';
import Header from '../../components/Header';


export default class ShopDetail extends React.Component {

  static navigationOptions={
      header: <Header title='店铺详情' />
  }

  render() {
    return (
      <Text>ShopDetail</Text>
    );
  }


}
