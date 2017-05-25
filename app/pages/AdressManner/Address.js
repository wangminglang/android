/**
 * Created by duan on 2017/5/22.
 * 现有地址
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
    ScrollView
} from 'react-native';
//得到屏幕宽度
var dimen = require('Dimensions');
var width = dimen.get('window').width;
import Picker from 'react-native-picker';
import area from './area.json';
import CheckBox from 'react-native-check-box';
import Header from '../../components/Header';
import * as Api from './../../common/api';
import AddressListView from './AddressListView'
export default class Address extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: <Header title='地址管理' showLeftIcon={true} leftIconAction={() => navigation.goBack()}/>
    })

    constructor(props) {
        super(props);
        this.state = {
            addressList: []
        };
    };

    componentDidMount() {
        NetUtil.POST(Api.GET_ADDRESS_LIST, null, (data) => this.addressListsuccessCallback(data), null);
    }

    addressListsuccessCallback(data) {
        if (data.result) {
            Alert.alert(data.list.length);
            this.setState({
                addressList: data.list
            })
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <ScrollView>
                    <AddressListView
                        // dataSource={this.state.addressList}
                        dataSource={[1, 2, 3]}
                    ></AddressListView>
                    <TouchableOpacity style={styles.btn} onPress={() => this.addAdress()} activeOpacity={0.75}>
                        <Text style={styles.btnText}>
                            + 新建地址
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    /**
     * 新建地址
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
        width: 250,
        color: '#7f7f7f',
        fontSize: 14,
        marginLeft: 15,
    },
    btn: {
        marginTop: 30,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginLeft: 15,
        marginRight: 15,
        borderColor: '#7a7a7a'
    },
    btnText: {
        fontSize: 14,
        color: '#333333',
    }
})