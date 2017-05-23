/**
 * Created by duan on 2017/5/22.
 * 地址管理
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

import Header from '../../components/Header';
export default class Adress extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: <Header title='地址管理' showLeftIcon={true} leftIconAction={() => navigation.goBack()}/>
    })

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <View style={styles.content}>
                <Image source={require('./../../images/bg_gerenzhongxin.png')} style={styles.imgStyle}/>
                <Text style={styles.txtStyle}>您还没有收货地址</Text>
                <TouchableOpacity style={styles.btn} onPress={() => this.addAdress()} activeOpacity={0.75}>
                    <Text style={styles.btnText}>
                        + 新建地址
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }

    /**
     * 添加地址
     */
    addAdress() {
        const {navigate} = this.props.navigation;
        navigate('MineAddAdress');
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgStyle: {
        width: 66,
        height: 93,
    },
    txtStyle: {
        fontSize: 15,
        color: '#7a7a7a',
        marginTop: 24,
    },
    btn: {
        marginTop: 19,
        width: 98,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#7a7a7a'
    },
    btnText: {
        fontSize: 14,
        color: '#333333',
    }
})