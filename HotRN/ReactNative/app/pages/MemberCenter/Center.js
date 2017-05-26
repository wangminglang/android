/**
 * Created by duan on 2017/4/22.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    ScrollView,
    TouchableOpacity
} from 'react-native';
var MyCell = require('./MyCell');
var Middle = require('./MyMiddleView');
var HeadView = require('./MyHeaderView');
import Login from'../Login/Login';
import Adress from '../AdressManner/NoAddress';
import * as Api from './../../common/api';
import Header from '../../components/Header';
//得到屏幕宽度
var dimen = require('Dimensions');
var width = dimen.get('window').width;
export default class Mine extends React.Component {
    static navigationOptions = (navigation) => ({
        header: null
    })
    static defaultProps = {
        id: "",
    };

    constructor(props) {
        super(props);
        this.state = {
            imgUrl: "",
            userName: "",
            waitPay: "",
            waitShipping: "",
            shipping: "",
            partShipped: "",
            messageNum: "",
            addressNun: 0,
            mobile: ""
        };
    };

    componentDidMount() {
        let params = {
            'id': 1,
        };
        NetUtil.POST(Api.GET_USER_INFO, params, (data) => this.successCallback(data), null);
    }

    successCallback(data) {
        if (data.result) {
            this.setState({
                imgUrl: data.data.icon,
                userName: data.data.username,
                waitPay: data.data.orderState.waitPay,
                waitShipping: data.data.orderState.waitShipping,
                shipping: data.data.orderState.shipping,
                partShipped: data.data.orderState.partShipped,
                messageNum: data.data.messageNum,
                addressNun: data.data.addressNun,
                mobile: data.data.mobile
            })
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <ScrollView style={styles.scrollStyle}>
                    <View>
                        <HeadView
                            imgUrl={this.state.imgUrl}
                            messageNum={this.state.messageNum}
                            userName={this.state.userName}/>
                        <MyCell
                            leftTitle="我的订单"
                        />

                        <Middle
                            waitPay={this.state.waitPay}
                            waitShipping={this.state.waitShipping}
                            shipping={this.state.shipping}
                            partShipped={this.state.partShipped}/>

                    </View>
                    <View style={{marginTop: 20}}>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => this.jump_ToAddressManner()}>
                            <MyCell
                                leftTitle="地址管理"
                            />
                        </TouchableOpacity>

                    </View>
                    <MyCell
                        leftTitle="联系客服"
                    />
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => this._jump_ToSetting()}>
                        <MyCell
                            leftTitle="设置"
                        />
                    </TouchableOpacity>
                </ScrollView>
            </View>

        );
    }

    /**
     * 地址管理
     */
    jump_ToAddressManner() {
        const {navigate} = this.props.navigation;
        navigate('Address', {addressNun: this.state.addressNun});
    }

    /**
     * 跳转设置
     * @private
     */
    _jump_ToSetting() {
        const {navigate} = this.props.navigation;
        navigate('Setting', {mobile: this.state.mobile});
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    scrollStyle: {
        width: width,
    },
});
//输出组件类
module.exports = Mine;

