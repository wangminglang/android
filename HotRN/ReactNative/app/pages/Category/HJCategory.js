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


export default class Category extends React.Component {



  constructor(props){
    super(props);
    this.state = {link:'link'};
  };



  render() {
    return (
      <Text>Category</Text>
    );
  }


}
