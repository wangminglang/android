'use strict';

/**
 * Created by duan on 2017/5/12.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import TextDivider from "./TextDriver";
import TimerMixin from 'react-timer-mixin'
//得到屏幕宽度
var dimen = require('Dimensions');
var width = dimen.get('window').width;
import CheckBox from 'react-native-check-box';

var timer;

var Login = React.createClass({
    mixins:[TimerMixin],



    getDefaultProps () {
        return{
            duration: 1000,
            countDown: '5',
        }

    },

    getInitialState(){
        return{
            countDown:'发送验证码',
            disabled:false
        }
    },

    

    startTimer(){
        var count = this.props.countDown;
        timer = this.setInterval(function () {
            
            if(count>0){
               count--;
               this.setState({
                countDown:count,
                disabled:true
               }); 
            }else{
                this.setState({
                countDown:'发送验证码',
                disabled:false,
               });
               this.clearInterval(timer);
            }
            
            console.log(this.state.countDown);
        },this.props.duration);
    },

    componentDidMount: function() {
        // this.startTimer();
    },



    render() {
        return (
            <View style={styles.content}>
                <View style={styles.titlebar}>
                    <TouchableOpacity style={styles.navLeftIconStyle} onPress={() => {
                        this.props.navigator.pop()
                    }}>
                        <Image source={{uri: 'icon_camera_back_normal'}} style={styles.navLeftIconStyle}></Image>
                    </TouchableOpacity>
                    <Text style={styles.top_txt_style}>好价</Text>
                </View>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="手机号"
                    keyboardType='numeric'
                    underlineColorAndroid='transparent'>
                </TextInput>
                <View style={styles.marginTop}>
                    <TextInput
                        style={styles.inputCodeStyle}
                        placeholder="验证码"
                        underlineColorAndroid='transparent'>
                    </TextInput>
                    <View style={styles.divider}/>
                    <TouchableOpacity onPress={()=>this.startTimer()} disabled={this.state.disabled}>
                        <View style={styles.getCode}>
                            <Text style={styles.codeStyle}>
                                {this.state.countDown}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <View style={styles.btnLogin}>
                        <Text style={styles.loginText}>
                            登录
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.agreement}>
                    <CheckBox
                    ></CheckBox>
                    <Text>
                        我已阅读并同意<Text >《服务协议》</Text>
                    </Text>
                </View>
                <View style={styles.bottom}>
                    <TextDivider text="其他账号登录"/>
                    <Image source={{uri: 'zby'}} style={styles.img}/>
                </View>
            </View>
        );
    },
});
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    top_txt_style: {
        fontSize: 16,
        color: '#525252'
    },
    navIconStyle: {
        height: 20,
        width: 20,
        position: 'absolute',
        right: 10
    },
    navLeftIconStyle: {
        height: 20,
        width: 20,
        position: 'absolute',
        left: 10
    },
    titlebar: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    marginTop: {
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputStyle: {
        height: 45,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#EDEDED',
        marginTop: 15,
        fontSize: 15,
        paddingLeft: 15
    },
    inputCodeStyle: {
        width: 230,
        height: 45,
        backgroundColor: '#EDEDED',
        fontSize: 15,
        paddingLeft: 15
    },
    codeStyle: {
        fontSize: 15,
        textAlign: 'center',
        color: '#333333'
    },
    getCode: {
        width: 100,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EDEDED',
    },
    btnLogin: {
        height: 45,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 30,
        backgroundColor: '#EB4D3F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    agreement: {
        marginTop: 23,
        marginLeft: 15,
        flexDirection: 'row',
    },
    bottom: {
        width: width,
        position: 'absolute',
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomText: {
        textAlign: 'center',
        fontSize: 11,
    },
    img: {
        width: 50,
        height: 50,
    },
    divider: {
        backgroundColor: '#3d3d3d',
        height: 30,
        width: .5
    },
});
//输出组件类
module.exports = Login;