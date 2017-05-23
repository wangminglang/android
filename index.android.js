'use strict'
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
} from 'react-native';
import Main from './app/HJMain';
export default class HotRN extends Component {

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

AppRegistry.registerComponent('HotRN', () => HotRN);
