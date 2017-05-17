/**
 * Created by duan on 2017/4/22.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Switch
} from 'react-native';
var data = require('./tsconfig.json')
var MyCell = React.createClass({
    render() {
        return (
            <View style={styles.viewStyle}>
                {this.renderAllView()}
            </View>
        );
    },
    renderAllView(){
        //定义数组
        var view = [];
        for (var i = 0; i < data.length; i++) {
            view.push(
                <InnerView key={i} number={data[i].number} title={data[i].title}></InnerView>
            );
        }
        return view;
    }
});
var InnerView = React.createClass({
    getDefaultProps(){
        return {
            number: '',
            title: '',
        }
    },
    render() {
        return (
            <View style={styles.viewStyle}>
                <View style={styles.leftViewStyle}>
                    <Text style={styles.txt_style_top}>{this.props.number}</Text>
                    <Text style={styles.txt_style_bottom}>{this.props.title}</Text>
                </View>
            </View>
        );
    },
});
const styles = StyleSheet.create({
    txt_style_top: {
        fontSize: 16,
        textAlign: 'center',
        color: '#ea4335',
    },
    txt_style_bottom: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 13,
    },
    leftViewStyle: {
        paddingTop: 15,
        paddingBottom: 15
    },
    rightViewStyle: {
        flexDirection: 'row',
    },
    iconStyle: {
        height: 20,
        width: 20,
        marginRight: 10
    },
    leftImgStyle: {
        height: 25,
        width: 25,
        marginLeft: 10
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
    }
});
//输出组件类
module.exports = MyCell;