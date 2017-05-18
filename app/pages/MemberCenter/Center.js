/**
 * Created by duan on 2017/4/22.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
var MyCell = require('./MyCell');
var Middle = require('./MyMiddleView');
var HeadView = require('./MyHeaderView')
//得到屏幕宽度
var dimen = require('Dimensions');
var width = dimen.get('window').width;
export default class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: "",
            userName: "",
            waitPay: "",
            waitShipping: "",
            shipping: "",
            partShipped: ""
        };
    };

    componentDidMount() {
        NetUtil.GET("http://192.168.1.248:957/buyerapi/user/getUserInfo?id=1", (data) => this.successCallback(data), null);
    }

    successCallback(data) {
        if (data.result) {
            console.log(data.data.icon);
            this.setState({
                imgUrl: data.data.icon,
                userName: data.data.username,
                waitPay: data.data.orderState.waitPay,
                waitShipping: data.data.orderState.waitShipping,
                shipping: data.data.orderState.shipping,
                partShipped: data.data.orderState.partShipped
            })
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <ScrollView style={styles.scrollStyle}>
                    <View>
                        <HeadView>
                            imgUrl={this.state.imgUrl}
                            userName={this.state.userName}
                        </HeadView>
                        <MyCell
                            leftTitle="我的订单"
                        />

                        <Middle>
                            waitPay={this.state.waitPay}
                            waitShipping={this.state.waitShipping}
                            shipping={this.state.shipping}
                            partShipped={this.state.partShipped}
                        </Middle>
                    </View>
                    <View style={{marginTop: 20}}>
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

