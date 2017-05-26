/**
 * Created by duan on 2017/4/22.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Switch
} from 'react-native';
export default class MyCell extends React.Component {
    static defaultProps = {
        imgName: '',
        leftTitle: '',
        rightTitle: '',
        rightImgname: ''
    };

    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <View style={styles.leftViewStyle}>
                    {/*<Image source={{uri: this.props.imgName}} style={styles.leftImgStyle}/>*/}
                    <Text style={styles.txt_style}
                          ref={component => this._root = component}>{this.props.leftTitle}</Text>
                </View>
                {/*-------右边---------*/}
                <View style={styles.rightViewStyle}>
                    {  this.renderRightView()}
                    <Image source={require('./../../images/ico_jiantou.png')} style={styles.iconStyle}/>
                </View>
            </View>
        );
    }

    //右边内容
    renderRightView() {
        if (this.props.rightImgname.length == 0) {//不返回图片
            return (
                <Text style={styles.txt_style}>{this.props.rightTitle}</Text>
            )
        } else {
            return (
                <Image source={{uri: this.props.rightImgname}} style={styles.iconStyle}/>
            )
        }
    }

    //右边
    renderRightTitle() {
        if (this.props.rightTitle.length > 0) {
            return (
                <Text style={{marginRight: 10}}>{this.props.rightTitle}</Text>
            )
        }
    }
}
const styles = StyleSheet.create({
    txt_style: {
        fontSize: 14,
        marginLeft: 15,
        color: '#333333'
    },
    leftViewStyle: {
        flexDirection: 'row',
    },
    rightViewStyle: {
        flexDirection: 'row',
        alignItems: "center"
    },
    iconStyle: {
        height: 15,
        width: 8,
        marginRight: 15,
        marginLeft:10
    },
    leftImgStyle: {
        height: 25,
        width: 25,
        marginLeft: 10
    },
    viewStyle: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderBottomWidth: .5,
        borderBottomColor: '#dddddd',
    }
});
//输出组件类
module.exports = MyCell;