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
    // this.state = {itemArr:[]};
  };

  render() {
    return(
      <View style={styles.container}>
        <Swiper height={width*0.4}  showsButtons={false} autoplay={true}>
          {this.renderScrollItem()}
        </Swiper>
      </View>
    );
  }

  renderScrollItem() {
    var itemArr = [];
    // console.log("++++++",this.props.dataSource);

    for (var i = 0; i < this.props.dataSource.length; i++) {
      var item = this.props.dataSource[i];
      var imageItem = this.renderLoopImage(item,i);
      itemArr.push(
        imageItem
      );

    }
    return itemArr;
  }

  renderLoopImage(item,i){

      if (item.image) {
        return(
        <TouchableOpacity key={i} onPress={() => this.cellClick(i)}>
            <Image source={{uri: item.image}} style={styles.image} />
        </TouchableOpacity>)
      }else {
        return(
        <TouchableOpacity key={i} onPress={() => this.cellClick(i)}>
            <Image source={{uri: "1"}} style={styles.image} />
        </TouchableOpacity>)
      }
  }

  cellClick(data) {
    if (this.props.callBack == null) return;
    this.props.callBack(data);
  }

}


const styles = StyleSheet.create({
    container:{
      marginTop: 10,
      height: width*0.4,
    },
    image: {
      width: width,
      height: width*0.4,
      resizeMode:'stretch'
    },

});
