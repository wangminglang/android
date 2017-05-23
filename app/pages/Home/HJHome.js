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
import Loading from '../../components/Loading';

export default class Home extends React.Component {


  static navigationOptions = (navigation) => ({
      header: <Header title="首页" />
  })

  constructor(props){
    super(props);
    this.state = {
      headLunbo:[],
      catInfo:Object,
      goodsList:[],
      catList:[],
      isLoading:true
    };
  };


        // {this.renderNavBar()}

  render() {
    return (
      <View style={styles.container}>
        {this.renderTextInput()}
        {this.renderSliderView()}
        {this.renderHomeList()}
        <Loading isShow={this.state.isLoading} />
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
    NetUtil.POST('buyerapi/home/getHomeAllClassFirstPageData','',(data)=>this.successCallback(data));
    NetUtil.POST('buyerapi/cat/getAllCatList','',(data)=>this.getAllCatList(data));
  }

  successCallback(data){
    this.setState({
      isLoading:false
    });
    // console.log(data);
    if (data.result) {
      this.setState({
        headLunbo:data.data[0].headLunbo,
        catInfo:data.data[0].catInfo,
        goodsList:data.data[0].goodsList,
      })
    }
  }

  getAllCatList(data){
    if (data.result) {
      this.setState({
          catList:data.data
      })
    }
        console.log('11111'+this.state.catList);

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
