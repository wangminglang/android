'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import LoopView from '../../components/HJLoopView'
import HomeList from './HJHomeListView'

export default class Home extends React.Component {



  constructor(props){
    super(props);
    this.state = {
      headLunbo:[],
      catInfo:Object,
      goodsList:[]
    };
  };



  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderTextInput()}
        {this.renderSliderView()}
        {this.renderLoopView()}
        {this.renderHomeList()}
      </View>
    );
  }

  renderTextInput(){
    return(
      <View style={styles.searchBarViewStyle}>
        <TextInput
         multiline = {true}
         numberOfLines = {4}
         onChangeText={(text) => this.setState({text})}
         value={this.state.text}
         style={styles.textInputStyle}
         placeholder="搜索全部"
       />
      </View>
    )
  }

  renderNavBar(){
    return(
      <View style={styles.navBarStyle}>
        <Text>
          {this.state.catInfo.className}
        </Text>
      </View>
    )
  }

  renderSliderView(){
    return(
      <View style={styles.sliderViewStyle}>
      </View>
    )
  }

  renderLoopView(){
    return(
      <LoopView dataSource={this.state.headLunbo}/>
    )
  }

  renderHomeList(){
    return(
      <HomeList dataSource={this.state.goodsList}/>
    )
  }


  componentDidMount(){
    global.NetUtil.GET("http://192.168.1.248:957/buyerapi/home/getHomeAllClassFirstPageData",(data)=>this.successCallback(data),null);

  }

  successCallback(data){
    if (data.result) {
      this.setState({
        headLunbo:data.data[0].headLunbo,
        catInfo:data.data[0].catInfo,
        goodsList:data.data[0].goodsList
      })
    }
    // console.log(this.state);
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dddddd',
    },
    textInputStyle:{
      height:30,
      width:0.7*gScreen.width,
      backgroundColor:'#7f7f7f',
      marginLeft:0.15*gScreen.width
    },
    navBarStyle:{
      height:gScreen.navBarHeight,
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center'
    },
    searchBarViewStyle:{
      justifyContent:'center',
      alignItems:'center',
      height:50,
      backgroundColor:'white',
      marginTop:1
    },
    sliderViewStyle:{
      height:30,
      backgroundColor:'white'
    }

});
