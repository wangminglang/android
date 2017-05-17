/**
 * Created by duan on 2017/4/22.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView
} from 'react-native';
var MyCell = require('./MyCell');
var Middle = require('./MyMiddleView');
var HeadView = require('./MyHeaderView')
//得到屏幕宽度
var dimen = require('Dimensions');
var width = dimen.get('window').width;
var Mine = React.createClass({
    render() {
        return (
            <View style={styles.content}>
                <ScrollView style={{width:width}}>
                    <View>
                        <HeadView/>
                        <MyCell
                            leftTitle="我的订单"
                        />
                        <Middle></Middle>
                    </View>
                    <View style={{marginTop: 20,width:width}}>
                        <MyCell
                            leftTitle="地址管理"
                        />
                    </View>
                    <MyCell
                        leftTitle="联系客服"
                    />
                    <MyCell
                        leftTitle="设置"
                    />
                </ScrollView>
            </View>

        );
    },
});
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
});
//输出组件类
module.exports = Mine;

