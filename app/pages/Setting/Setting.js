/**
 * Created by duan on 2017/5/26.
 */
'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity
} from 'react-native';
//得到屏幕宽度
var dimen = require('Dimensions');
var width = dimen.get('window').width;
import Header from '../../components/Header';
import MyCell from './../MemberCenter/MyCell'
import * as Api from './../../common/api';
export default class Setting extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: <Header title='设置' showLeftIcon={true} leftIconAction={() => navigation.goBack()}/>
    })
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
    };


    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.content}>
                <View style={styles.top}>
                    <Text style={styles.txt}>手机号码</Text>
                    <Text style={styles.txt}>{params.mobile}</Text>
                </View>
                <MyCell
                    leftTitle="清除缓存"
                    rightTitle="1.3M"
                />
                <MyCell
                    leftTitle="服务协议"
                />
                <MyCell
                    leftTitle="评价我们"
                />
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => this.save()}>
                    <View style={styles.btnLogin}>
                        <Text style={styles.loginText}>
                            退出登录
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.bottom}>
                    <Image source={require('./../../images/bg_gerenzhongxin.png')} style={styles.imgStyle}/>
                    <Text style={styles.bottomTxt}>版本号：1.0.0</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    top: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'white',
        borderBottomWidth: .5,
        borderBottomColor: '#dddddd',
    },
    txt: {
        color: '#333333',
        fontSize: 14,
    },
    btnLogin: {
        height: 45,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        color: '#333333',
        fontSize: 16,
        textAlign: 'center'
    },
    imgStyle: {
        height: 30,
        width: 59,
    },
    bottom: {
        width: width,
        position: 'absolute',
        bottom: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomTxt: {
        color: '#7f7f7f',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10
    }
})
