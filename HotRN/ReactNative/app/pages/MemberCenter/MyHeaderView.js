/**
 * Created by duan on 2017/4/22.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';
//得到屏幕宽度
var dimen = require('Dimensions');
var width = dimen.get('window').width;
export default class HeaderView extends React.Component {
    static defaultProps = {
        imgUrl: null,
        userName: "",
        messageNum:"",
    };
    render() {
        return (
            <View>
                {this.renderHeadView()}
            </View>
        );
    }

    //顶部view
    renderHeadView() {
        return (
            <View style={{alignItems: 'center'}}>
                <Image source={require('./../../images/bg_gerenzhongxin.png')} style={styles.bg_style}>
                    <Image source={this.props.imgUrl?{uri:this.props.imgUrl}:require('./../../images/ico_touxiang.png')} style={styles.top_img_style}/>
                    <Text style={{marginTop: 15, color: 'white',}}>{this.props.userName}</Text>
                    <Image source={this.props.messageNum===0 ?require('./../../images/ico_shouyexiaoxi.png'): require('./../../images/ico_xiaoxi_hong.png')} style={styles.top_right_img_style}/>
                    
                </Image>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    top_img_style: {
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    top_right_img_style: {
        position: 'absolute',
        right: 15,
        top: 20,
        height: 17,
        width: 19,
    },
    bg_style: {
        height: 165,
        width: width,
        resizeMode: 'stretch',
        alignItems: 'center',
        paddingTop: 20,
    },
});
//输出组件类
module.exports = HeaderView;