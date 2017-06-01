'use strict'
import GlobalContants from './app/common/globalConstants';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
} from 'react-native';
import Main from './app/HJMain';
export default class Haojia extends Component {

    render() {
        return (
              <Main/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    }
});

AppRegistry.registerComponent('Haojia', () => Haojia);
