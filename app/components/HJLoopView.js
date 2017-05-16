'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

import NetUtil from '../common/HJNetUtil';
import Swiper from 'react-native-swiper';

export default class LoopView extends React.Component{


  static defaultProps = {
        dataSource: [],
        callBack: null
  };


  constructor(props){
    super(props);
    this.state = {itemArr:[]};
  };

  render() {
    return(
      <View style={styles.container}>
        <Swiper height={200}  showsButtons={false} autoplay={true}>
          {this.renderScrollItem()}
        </Swiper>
      </View>
    );
  }

  renderScrollItem() {
    var itemArr = [];

    for (var i = 0; i < this.state.itemArr.length; i++) {
      var item = this.state.itemArr[i];
      var imageItem = this.renderLoopImage(item,i);
      itemArr.push(
        imageItem
      );

    }
    return itemArr;
  }

  renderLoopImage(item,i){

      if (item.img_url) {
        return(
        <TouchableOpacity key={i} onPress={() => this.cellClick(i)}>
            <Image source={{uri: item.img_url}} style={styles.image} />
        </TouchableOpacity>)
      }else {
        return(
        <TouchableOpacity key={i} onPress={() => this.cellClick(i)}>
            <Image source={{uri: "2"}} style={styles.image} />
        </TouchableOpacity>)
      }
  }

  cellClick(data) {
    if (this.props.callBack == null) return;
    this.props.callBack(data);
  }

  componentDidMount(){
    global.NetUtil.POST("http://119.2.8.83:888/api/index_app/lunbo", {'source': '0'}, (data)=>this.dealLunBoData(data));
  }

  dealLunBoData(data){
    if (data.result) {
      this.setState({
        itemArr:data.data
      })
    }
  }
}


const styles = StyleSheet.create({
    container:{
      marginTop: 10,
      height: 200,
    },
    image: {
      width: width,
      height: 200,
      resizeMode:'stretch'
    },

});
