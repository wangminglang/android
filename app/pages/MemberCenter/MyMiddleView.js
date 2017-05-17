/**
 * Created by duan on 2017/4/22.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
var MyCell = React.createClass({
    render() {
        return (
            <View style={styles.viewStyle}>
                <View style={styles.leftViewStyle}>
                    <Text style={styles.txt_style_top}>1</Text>
                    <Text style={styles.txt_style_bottom}>待付款</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.leftViewStyle}>
                    <Text style={styles.txt_style_top}>2</Text>
                    <Text style={styles.txt_style_bottom}>拼团中</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.leftViewStyle}>
                    <Text style={styles.txt_style_top}>3</Text>
                    <Text style={styles.txt_style_bottom}>代发货</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.leftViewStyle}>
                    <Text style={styles.txt_style_top}>4</Text>
                    <Text style={styles.txt_style_bottom}>待收货</Text>
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
    },
    divider: {
        backgroundColor: '#3d3d3d',
        height: 40,
        width:.5
    },
});
//输出组件类
module.exports = MyCell;