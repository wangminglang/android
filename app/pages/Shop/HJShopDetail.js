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

  static navigationOptions = ({ navigation }) => ({
    header: <Header title={navigation.state.params.nameShop} showLeftIcon={true} leftIconAction={() => navigation.goBack()} />
  })

  componentDidMount() {
    const {params} = this.props.navigation.state;
  }

  render() {
    return (
      <Text>ShopDetail</Text>
    );
  }


}
