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
    Image,
    Alert
} from 'react-native';
import TextDivider from "./TextDriver";
//得到屏幕宽度
var dimen = require('Dimensions');
var width = dimen.get('window').width;
import CheckBox from 'react-native-check-box';
import TimerMixin from 'react-timer-mixin'
import Header from '../../components/Header';
import * as Api from './../../common/api';
var timer;
export default class Login extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: <Header title='好价' showLeftIcon='true' leftIconAction={() => navigation.goBack()}/>
    })
    //noinspection JSAnnotator
    mixins: [TimerMixin]
    static defaultProps = {
        duration: 1000,
        countDown: '5',
    };

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: "",
            code: "",
            countDown: '发送验证码',
            disabled: false,
            checked: true
        };
    };

    startTimer() {
        var count = this.props.countDown;
        timer = setInterval(() => {

            if (count > 0) {
                count--;
                this.setState({
                    countDown: count,
                    disabled: true
                });
            } else {
                this.setState({
                    countDown: '获取验证码',
                    disabled: false,
                });
                clearInterval(timer);
            }

            console.log(this.state.countDown);
        }, this.props.duration);
    }

    render() {
        return (
            <View style={styles.content}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="手机号"
                    keyboardType='numeric'
                    onChangeText={(text) => {
                        this.state.phoneNumber = text
                    }}
                    underlineColorAndroid='transparent'>
                </TextInput>
                <View style={styles.marginTop}>
                    <TextInput
                        style={styles.inputCodeStyle}
                        placeholder="验证码"
                        onChangeText={(text) => {
                            this.state.code = text
                        }}
                        underlineColorAndroid='transparent'>
                    </TextInput>
                    <View style={styles.divider}/>
                    <TouchableOpacity onPress={() => this.getCode()}
                                      activeOpacity={0.75}
                                      disabled={this.state.disabled}>
                        <View style={styles.code}>
                            <Text style={styles.codeStyle}>
                                {this.state.countDown}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => this.login()}>
                    <View style={styles.btnLogin}>
                        <Text style={styles.loginText}>
                            登录
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.agreement}>
                    <CheckBox
                        onClick={() => this.onCheck()}
                        isChecked={this.state.checked}
                        checkedImage={<Image source={require('./../../images/zhifugou.png')}
                                             style={{width: 18, height: 18}}/>}
                        unCheckedImage={<Image source={require('./../../images/zhifugou2.png')}
                                               style={{width: 18, height: 18}}/>}
                    ></CheckBox>
                    <Text style={styles.agreeText}>
                        我已阅读并同意<Text >《服务协议》</Text>
                    </Text>
                </View>
                <View style={styles.bottom}>
                    <TextDivider text="其他账号登录"/>
                    <Image source={{uri: 'zby'}} style={styles.img}/>
                </View>
            </View>
        );
    }

    /**
     * 登陆
     */
    login() {
        if (this.state.checked === false) {
            Alert.alert("您必须同意服务协议");
            return;
        }
        if (this.state.phoneNumber.length === 0) {
            Alert.alert("手机号不能为空");
            return;
        }
        if (this.state.code.length === 0) {
            Alert.alert("验证码不能为空");
            return;
        }
        let params = {
            'mobile': this.state.phoneNumber,
            'code': this.state.code,
        };
        NetUtil.POST(Api.LOGIN, params, (data) => this.successCallback(data));
    }

    successCallback(data) {
        console.log(data);
        if (data.result) {
            Alert.alert("登录成功");

        } else {
            Alert.alert("登录失败");
        }
    }

    /**
     * 获取验证码
     */
    getCode() {
        if (this.state.phoneNumber.length === 0) {
            Alert.alert("手机号不能为空");
            return;
        }
        let params = {
            'mobile': this.state.phoneNumber,
        };
        NetUtil.POST(Api.GET_VERIFY_CODE, params, (data) => this.successGetCodeCallback(data));
        this.startTimer();
    }

    successGetCodeCallback(data) {
        console.log(data);
        if (data.result) {
            Alert.alert("发送成功");
        }
    }

    onCheck() {
        this.setState({
            checked: !this.state.checked
        })
    }
}
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
        width: 250,
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
    code: {
        width: 103.5,
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
        alignItems: 'center'
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
    agreeText:{
        marginLeft:10,
        fontSize:14,
        color:'#7f7f7f'
    }
});