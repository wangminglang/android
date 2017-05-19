'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import HomeList from './HJHomeListView'
import HomeSlider from './HJHomeSlider'
import Header from '../../components/Header';

export default class Home extends React.Component {


  static navigationOptions = (navigation) => ({
      header: <Header title="首页" />
  })

  constructor(props){
    super(props);
    this.state = {
      headLunbo:[],
      catInfo:Object,
      goodsList:[]
    };
  };


        // {this.renderNavBar()}

  render() {
    return (
      <View style={styles.container}>
        {this.renderTextInput()}
        {this.renderSliderView()}
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
        <HomeSlider/>
      </View>
    )
  }

  renderHomeList(){
    return(
      <HomeList
        dataSource={this.state.goodsList}
        headLunbo={this.state.headLunbo}
      />
    )
  }


  componentDidMount(){
    global.NetUtil.POST('http://192.168.1.248:957/buyerapi/home/getHomeAllClassFirstPageData','',(data)=>this.successCallback(data));
  }

  successCallback(data){
    console.log(data);
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
      backgroundColor:'#dddddd',
      marginLeft:0.15*gScreen.width,
      borderRadius:15,
      paddingLeft:10,
      fontSize:15,
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
