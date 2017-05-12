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

import Main from './app/HJMain';

export default class NHPatient extends React.Component {
  render() {
    return (
      <Main />
    );
  }
}

// 整体js模块的名称
AppRegistry.registerComponent('NHPatient', () => NHPatient);
