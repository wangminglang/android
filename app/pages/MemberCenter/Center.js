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
import Login from'../Login/Login'
//得到屏幕宽度
var dimen = require('Dimensions');
var width = dimen.get('window').width;
export default class Mine extends React.Component {
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
            messageNum:""
        };
    };

    componentDidMount() {
        let params = {
            'id': 1,
        };
        NetUtil.POST("http://192.168.1.248:957/buyerapi/user/getUserInfo",params, (data) => this.successCallback(data), null);
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
                messageNum:data.data.messageNum,
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
                        <TouchableOpacity onPress={() => this.jump_ToAddressManner()}>
                            <MyCell
                                leftTitle="地址管理"
                            />
                        </TouchableOpacity>

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
    }

    /**
     * 地址管理
     */
    jump_ToAddressManner() {
        // Alert.alert('点击了');
        const {navigate} = this.props.navigation;
        navigate('MineLogin');
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

