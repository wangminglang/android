/**
 * Created by duan on 2017/5/22.
 * 地址管理
 */
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


export default class Adress extends React.Component {

    constructor(props){
        super(props);
    };

    render() {
        return (
            <Text>Adress</Text>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
})