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
var HeaderView = React.createClass({
    render() {
        return (
            <View style={styles.viewStyle}>
                {this.renderHeadView()}
            </View>
        );
    },
    //顶部view
    renderHeadView(){
        return (
            <View style={{alignItems: 'center', paddingTop: 15, paddingBottom: 30,}}>
                <Image source={{uri: 'see'}} style={styles.top_img_style}/>
                <Text style={{marginTop: 15, color: 'white',}}>18888888888888</Text>
                <Image source={{uri: 'see'}} style={styles.top_right_img_style}/>
            </View>
        )
    },
});
const styles = StyleSheet.create({
    top_img_style: {
        height: 60,
        width: 60,
        marginLeft: 10,
        borderRadius: 30,
    },
    top_right_img_style: {
        position: 'absolute',
        right: 15,
        top: 20,
        height: 17,
        width: 19,
    },
    viewStyle: {
        backgroundColor: 'red',
    }
});
//输出组件类
module.exports = HeaderView;