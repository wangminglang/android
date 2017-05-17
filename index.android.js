'use strict'
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
} from 'react-native';
import Mine from './app/pages/MemberCenter/Center';
export default class HotRN extends Component {

    render() {
        return (
            <View style={styles.container}>
              <Mine></Mine>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    }
});

AppRegistry.registerComponent('HotRN', () => HotRN);
