'use strict'
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
} from 'react-native';
var Login = require('./Component/Login/Login');
var Center=require('./Component/MemberCenter/Center');
export default class HotRN extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Center></Center>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    img: {
        width: 90,
        height: 90,
    }
});

AppRegistry.registerComponent('HotRN', () => HotRN);
