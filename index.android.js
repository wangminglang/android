'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  NativeModules,
  ToastAndroid,
  DeviceEventEmitter
} from 'react-native';

let title = 'React Native界面';
export default class HotRN extends Component {

   /**
    * 接收原生调用
    */
   componentDidMount() {
       DeviceEventEmitter.addListener('nativeCallRn',(msg)=>{
            title = "React Native界面,收到数据：" + msg;
            ToastAndroid.show("发送成功", ToastAndroid.SHORT);
       })
   }

   /**
    * 调用原生代码
    */
    skipNativeCall() {
       let phone = '18637070949';
       NativeModules.commModule.rnCallNative(phone);
    }

   /**
    * Callback 通信方式
    */
    callbackComm(msg) {
        NativeModules.commModule.rnCallNativeFromCallback(msg,(result) => {
             ToastAndroid.show("CallBack收到消息:" + result, ToastAndroid.SHORT);
        })
    }

    /**
     * Promise 通信方式
     */
    promiseComm(msg) {
        NativeModules.commModule.rnCallNativeFromPromise(msg).then(
            (result) =>{
                ToastAndroid.show("Promise收到消息:" + result, ToastAndroid.SHORT)
            }
        ).catch((error) =>{console.log(error)});
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} >
            {title}
        </Text>
         <Text style={styles.welcome} onPress={this.skipNativeCall.bind(this)}>
            跳转到拨号界面
         </Text>
         <Text style={styles.welcome} onPress={this.callbackComm.bind(this,'callback发送啦')}>
            Callback通信方式
         </Text>
         <Text style={styles.welcome} onPress={this.promiseComm.bind(this,'promise发送啦')}>
            Promise通信方式
         </Text>
          <Image source={{uri:'ico_del'}} style={styles.img}/>
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  img:{
  width:90,
  height:90,
  }
});

AppRegistry.registerComponent('HotRN', () => HotRN);
