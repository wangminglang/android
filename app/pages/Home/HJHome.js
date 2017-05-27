'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  InteractionManager,
  Image,
  TouchableOpacity
} from 'react-native';

import HomeList from './HJHomeListView';
import HomeSlider from './HJHomeSlider';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import HomeCategoryList from './HJHomeCategoryList';
import HomeMenus from './HJHomeMenus';


import * as Api from '../../common/api';

const sortTypes = [
  {title: '综合排序', typeNum: 0},
  {title: '销量排序', typeNum: 1},
  {title: '最新上架', typeNum: 2},
  {title: '价格从低到高', typeNum: 3},
  {title: '价格从高到低', typeNum: 4}
];

const selectedType = '0';
const selectedType2 = '';
const idClassification = '';
const page = 1;
const isRequesting = false;
const homePage = 1;

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
      categoryGoodsList:[],
      sortType:'综合排序',
      categoryType:'分类',
      isUnfold:false,
      isUnfoldC:false,
      isNoMore:false,
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
      isLoading:true,
      isUnfold:false,
      isUnfoldC:false,
      sortType:'综合排序',
      categoryType:'分类',
    });

    selectedType='0';
    selectedType2='';
    page = 1;
    idClassification = this.state.allCatList[index].id;

    this.requestGoodList();
    
  }

  requestGoodList(){

    InteractionManager.runAfterInteractions(() => {
      var params = {
        idClassification:idClassification,
        page:page,
        sortType:selectedType,
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
          onEndReached={()=>this._onEndReached()}
          isNoMore={this.state.isNoMore}
        />
      )
    }
    else{
      return(
        <View style = {styles.categoryGoodsListStyle}>
          {this.renderSortBar()}
          <HomeCategoryList list={this.state.categoryGoodsList}/>
          {this.renderMenu()}
        </View>
      )    
    }
    
  }

  renderSortBar(){
            //         </TouchableOpacity>

    return(
      <View style = {styles.sortBarStyle}>

        <TouchableOpacity activeOpacity={0.5} onPress={()=>this.clickLeft()} style = {styles.leftSortStyle}>

          <View style = {styles.leftSortStyle1}>
            <Text>{this.state.sortType}</Text>
            <Image source={this.state.isUnfold ? require('../../images/ico_up.png') : require('../../images/ico_down.png')} 
                   style={styles.sortBarLeftImageStyle}
            />
          </View>

        </TouchableOpacity>


        <TouchableOpacity activeOpacity={0.5} onPress={()=>this.clickRight()} style = {styles.rightCategoryStyle}>

          <View style = {styles.rightCategoryStyle1}>
            <Text>{this.state.categoryType}</Text>
            <Image source={this.state.isUnfoldC ? require('../../images/ico_up.png') : require('../../images/ico_down.png')} 
                   style={styles.sortBarLeftImageStyle}
            />       
          </View>

        </TouchableOpacity>


      </View>
    );
  }

  clickLeft(){
    // alert('1');
    if (!this.state.isUnfoldC) {
      this.setState({
      isUnfold:!this.state.isUnfold
    });
    }
    
  }

  clickRight(){
    if (!this.state.isUnfold) {
      this.setState({
      isUnfoldC:!this.state.isUnfoldC
    });
    }
  }

  renderMenu(){
    if (this.state.isUnfold) {
      return(
        <View style={styles.menusStyle}>
          <HomeMenus list={sortTypes} 
          callBack={(kind,index)=>this.clickSortType(kind,index)}
          seletedType={selectedType}
          />
          <TouchableOpacity activeOpacity={1} onPress={()=>this.unfold()}>
          <View style={styles.maskViewStyle}>
          </View>
          </TouchableOpacity>
        </View>
      )
    }
    else if (this.state.isUnfoldC) {
      if (this.state.allCatList[this.state.selectPager].subClass.length) {
        return(
          <View style={styles.menusStyle}>
            <HomeMenus list={this.state.allCatList[this.state.selectPager].subClass} 
            kind={1}
            seletedType={selectedType2}
            callBack={(kind,index)=>this.clickCategoryType(kind,index)}
            />
            <TouchableOpacity activeOpacity={1} onPress={()=>this.unfoldC()}>
            <View style={styles.maskViewStyle}>
            </View>
            </TouchableOpacity>
          </View>
        )
      }

    } 
  }
  clickSortType(i,j){
    selectedType = j;
    this.setState({
      isUnfold:false,
      sortType:sortTypes[j].title,
    });
    page = 1;
    this.requestGoodList();
  }
  clickCategoryType(i,j){
    selectedType2 = j;
    this.setState({
      isUnfoldC:false,
      categoryType:this.state.allCatList[this.state.selectPager].subClass[j].className
    });
    idClassification=this.state.allCatList[this.state.selectPager].subClass[j].id;
    page = 1;
    this.requestGoodList();
  }

  unfold(){
    this.setState({
      isUnfold:!this.state.isUnfold
    });
  }
  unfoldC(){
    this.setState({
      isUnfoldC:!this.state.isUnfoldC
    });
  }

  componentDidMount(){
    NetUtil.POST(Api.GetHomeAllClassFirstPageData,'',(data)=>this.successCallback(data));
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


  _onEndReached(){
    if (!isRequesting && !this.state.isNoMore) {
      isRequesting = true;
      homePage++;
      NetUtil.POST(Api.GetHomeMoreData,{page:homePage},(data)=>this.getHomeMoreData(data));
    }
  }
  //首页获得更多数据
  getHomeMoreData(data){
    isRequesting = false;
    var arr = this.state.goodsList;

    if (data.result) {
      if (!data.data.length) {
        this.setState({
          isNoMore:true
        })
        return;
      }
      arr.push(...data.data);
      this.setState({
        goodsList:arr
      });
    }

  }

  GetAllCatList(data){
    if (data.result) {
      var firstData = {
        "id":"-1",
        "className":"首页",
        "classImg":"",
        "subClass":[
        ]
      }
      data.data.splice(0,0,firstData);
      this.setState({
        allCatList:data.data
      });
      console.log('++++++',this.state.allCatList)
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
    categoryGoodsListStyle:{
      flex:1,
    },
    sortBarStyle:{
      marginTop:1,
      height:40,
      backgroundColor:'white',
      flexDirection:'row',
      alignItems:'center',
    },
    leftSortStyle:{
      position:'absolute',
      left:15,
      
    },

    leftSortStyle1:{
      flexDirection:'row',
      alignItems:'center'
    },

    rightCategoryStyle:{
      position:'absolute',
      right:15,
      
    },

    rightCategoryStyle1:{
      flexDirection:'row',
      alignItems:'center'
    },
    sortBarLeftImageStyle:{
      height:6,
      width:13,
      marginLeft:5,
    },
    menusStyle:{
      position:'absolute',
      top:40,
    },
    maskViewStyle:{
      height:500,
      width:gScreen.width,
      backgroundColor:'black',
      opacity:0.5
    }
});
