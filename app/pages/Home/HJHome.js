'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  InteractionManager
} from 'react-native';

import HomeList from './HJHomeListView';
import HomeSlider from './HJHomeSlider';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import HomeCategoryList from './HJHomeCategoryList';

import * as Api from '../../common/api';



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
      isLoading:true,
      allCatList:[],
      selectPager:0,
      categoryGoodsList:[]
    };
  };



  render() {
    return (
      <View style={styles.container}>
        {this.renderTextInput()}
        {this.renderSliderView()}
        {this.renderHomeList(this.state.selectPager)}
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
    if (this.state.allCatList.length) {
      return(
        <View style={styles.sliderViewStyle}>
          <HomeSlider list={this.state.allCatList} callBack={(index)=>this.clickSlider(index)}/>
        </View>
      )
    }
    
  }

  clickSlider(index){
    this.setState({
      selectPager:index,
      isLoading:true
    });
    InteractionManager.runAfterInteractions(() => {
        var params = {
        idClassificatioin:this.state.allCatList[index].id,
        page:1,
        sortType:0,
        keyWord:'',
        shopId:'',
      }
      NetUtil.POST(Api.GetGoodsList,params,(data)=>this.getGoodsList(data));
    });
  }

  renderHomeList(selectPager){
    if (selectPager == 0) {
      return(
        <HomeList
          dataSource={this.state.goodsList}
          headLunbo={this.state.headLunbo}
        />
      )
    }
    else{
      return(
        <View style = {styles.categoryGoodsListStyle}>
          <View style = {styles.sortBarStyle}>
          </View>
          <HomeCategoryList list={this.state.categoryGoodsList}/>
        </View>
      )    
    }
    
  }


  componentDidMount(){
    NetUtil.POST(Api.GetHomeAllClassFirstPageData,'',(data)=>this.successCallback(data));
    NetUtil.POST(Api.GetHomeMoreData,'',(data)=>this.getHomeMoreData(data));
    NetUtil.POST(Api.GetAllCatList,'',(data)=>this.GetAllCatList(data));

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

  getHomeMoreData(data){
    if (data.result) {
      
    }
  }

  GetAllCatList(data){
    if (data.result) {
      var firstData = {
        "id":"0",
        "className":"首页",
        "classImg":"",
        "subClass":[
        ]
      }
      data.data.splice(0,0,firstData);
      this.setState({
        allCatList:data.data
      });

    }
  }
  getGoodsList(data){
    this.setState({
      isLoading:false
    });
    if (data.result) {
      this.setState({
        categoryGoodsList:data.data.list
      });
    }
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
    },
    sortBarStyle:{
      marginTop:1,
      height:30,
      backgroundColor:'white'
    },
    categoryGoodsListStyle:{
      flex:1,
    }

});
