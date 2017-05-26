/**
 * Created by duan on 2017/5/22.
 * 添加地址
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
    TouchableOpacity,
    TextInput,
} from 'react-native';
//得到屏幕宽度
var dimen = require('Dimensions');
var width = dimen.get('window').width;
import Picker from 'react-native-picker';
import area from './area.json';
import CheckBox from 'react-native-check-box';
import Header from '../../components/Header';
import * as Api from './../../common/api';
import  {DeviceEventEmitter} from 'react-native';
export default class AddAdress extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: <Header title='新建收货地址' showLeftIcon={true} leftIconAction={() => navigation.goBack()}/>
    })

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phoneNumber: "",
            area: "",
            adress: '发送验证码',
            isDefault: 'true'
        };
    };

    render() {
        return (
            <View style={styles.content}>
                <View style={[styles.viewStyle, {marginTop: 15}]}>
                    <Text style={styles.txtStyle}>收件人</Text>
                    <TextInput style={styles.inputStyle}
                               placeholder="姓名"
                               onChangeText={(text) => {
                                   this.state.name = text
                               }}
                               underlineColorAndroid='transparent'>
                    </TextInput>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={styles.txtStyle}>联系电话</Text>
                    <TextInput style={styles.inputStyle}
                               placeholder="收货人电话号码，如为座机请加区号"
                               keyboardType='numeric'
                               onChangeText={(text) => {
                                   this.state.phoneNumber = text
                               }}
                               underlineColorAndroid='transparent'>
                    </TextInput>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={styles.txtStyle}>省市区</Text>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={this._showAreaPicker.bind(this)}>
                        <TextInput style={styles.choosetxt}
                                   underlineColorAndroid='transparent'
                                   editable={false}
                                   placeholder={"请选择省-市-区"}
                        >
                        </TextInput>
                    </TouchableOpacity>
                    <Image source={require('./../../images/ico_jiantou.png')} style={styles.iconStyle}/>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={styles.txtStyle}>街道地址</Text>
                    <TextInput style={styles.inputStyle}
                               placeholder="详细收获地址，可不写省市区"
                               onChangeText={(text) => {
                                   this.state.adress = text
                               }}
                               underlineColorAndroid='transparent'>
                    </TextInput>
                </View>
                <View style={styles.bottom}>
                    <CheckBox
                        onClick={() => this.onCheck()}
                        isChecked={this.state.isDefault}
                        checkedImage={<Image source={require('./../../images/zhifugou.png')}
                                             style={{width: 18, height: 18}}/>}
                        unCheckedImage={<Image source={require('./../../images/zhifugou2.png')}
                                               style={{width: 18, height: 18}}/>}
                    >
                    </CheckBox>
                    <Text style={styles.txt}>
                        设为默认地址
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => this.save()}>
                    <View style={styles.btnLogin}>
                        <Text style={styles.loginText}>
                            保存
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    onCheck() {
        this.setState({
            isDefault: !this.state.isDefault
        })
    }

    /**
     * 保存地址
     */
    save() {
        if (this.state.name.length === 0) {
            Alert.alert("请您输入姓名");
            return;
        }
        if (this.state.phoneNumber.length === 0) {
            Alert.alert("请您输入电话号码");
            return;
        }
        // if (this.state.area.length === 0) {
        //     Alert.alert("请您选择省-市-区");
        //     return;
        // }
        if (this.state.adress.length === 0) {
            Alert.alert("请您填写详细地址");
            return;
        }
        let params = {
            'id': 1,
            'receiver': this.state.name,
            'receiverPhone': this.state.phoneNumber,
            'regionId': this.state.name,
            'address': this.state.adress,
            'isDefault': this.state.isDefault
        };
        DeviceEventEmitter.emit('refreshData');
        this.props.navigation.goBack();
        // NetUtil.POST(Api.SAVE_ADDRESS, params, (data) => this.successCallback(data));
    }

    successCallback(data) {
        console.log(data);
        if (data.result) {
            Alert.alert("发送成功");
        }
    }

    /**
     * 选择省市区
     */
    _createAreaData() {
        let data = [];
        let len = area.length;
        for (let i = 0; i < len; i++) {
            let city = [];
            for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }

    _showAreaPicker() {
        Picker.init({
            pickerData: this._createAreaData(),
            selectedValue: ['河北', '唐山', '古冶区'],
            onPickerConfirm: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
                console.log('area', pickedValue);
            }
        });
        Picker.show();
    }

    _toggle() {
        Picker.toggle();
    }

    _isPickerShow() {
        Picker.isPickerShow(status => {
            alert(status);
        });
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    viewStyle: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: .5,
        borderBottomColor: '#dddddd',
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
    },
    txtStyle: {
        fontSize: 14,
        color: '#333333',
    },
    inputStyle: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 13,
        paddingLeft: 15,
        paddingRight: 15
    },
    iconStyle: {
        height: 20,
        width: 20,
        position: 'absolute',
        right: 10
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
    bottom: {
        marginTop: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        color: '#7f7f7f',
        fontSize: 14,
        marginLeft: 15,
    },
    choosetxt: {
        width:250,
        color: '#7f7f7f',
        fontSize: 14,
        marginLeft: 15,
    }
})