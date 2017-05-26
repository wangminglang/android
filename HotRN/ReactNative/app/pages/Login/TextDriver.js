/**
 * Created by duan on 2017/5/17.
 */

import React, {Component, PropTypes} from 'react';
import {Text, View, StyleSheet, Platform, PixelRatio, TouchableOpacity, Image} from 'react-native';

export default class TextDivider extends Component{
    static propTypes = {
        text: PropTypes.string.isRequired
    };

    render(){
        return(
            <View style={styles.view}>
                <View style={styles.divider}/>
                <Text style={styles.text}>{this.props.text}</Text>
                <View style={styles.divider}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    divider:{
        flex: 1,
        backgroundColor: '#3d3d3d',
        height: 0.5,
        marginLeft: 10,
        marginRight: 10
    },
    text:{
        color: '#3d3d3d',
        fontSize: 10,
        marginLeft: 10,
        marginRight: 10
    }
});
