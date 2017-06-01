'use strict';
import Common from './app/common/constants';
import GlobalContants from './app/common/globalConstants';

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

export default class Haojia extends React.Component {

  render() {
    var common = this.props['common'];
    Common.netConfig.UserAgent = common;
    return (
      <Main />
    );
  }

}

// 整体js模块的名称
AppRegistry.registerComponent('Haojia', () => Haojia);
