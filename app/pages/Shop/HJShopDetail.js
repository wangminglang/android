'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import Util from '../../common/HJNetUtil';
import * as Api from './../../common/api';
import SortHandleView from './HJSortHandleView';
import {tabStatus} from '../../HJMain';

const sortTypes = [
  {title: '综合排序', typeNum: 0},
  {title: '销量排序', typeNum: 1},
  {title: '最新上架', typeNum: 2},
  {title: '价格从低到高', typeNum: 3},
  {title: '价格从高到低', typeNum: 4}
]

let _this = null;
export default class ShopDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false, //隐藏tabBar
    header: <Header title={navigation.state.params.nameShop} showLeftIcon={true} leftIconAction={() => _this._goBack()}/>
  });

  _goBack(){
    alert('dqwbdqbwdubqw');
    this.props.navigation.goBack();
    tabStatus.show();
  }

  constructor(props) {
    super(props);
    _this = this;
    this.state = {
      shopDetail: {}
    }
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    Util.POST(Api.GET_SHOPS_DETAIL, {id: params.id}, (responseData) => {
      this.setState({
        shopDetail : responseData.data
      })
    })
  }
  componentWillMount(){
      tabStatus.hide();
  }

  componentWillUnmount() {
    
  }

  render() {
    const { shopDetail } = this.state;
    return (
      <View style={styles.container}>
        <TopView shopDetail={shopDetail} />
        <SortHandleView sortTypes={sortTypes} shopDetail={shopDetail} />
      </View>
    );
  }

}

const TopView = ({shopDetail}) => {
  return (
      <View style={{padding: 15, backgroundColor: gColors.white}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={{width: 42, height: 42}} source={shopDetail.image ? {uri: shopDetail.image} : require('../../images/dianputouxiang.jpg')} />
          <Text numberOfLines={1} style={{fontSize: 16, color: gColors.title, marginLeft: 15, width: gScreen.width-96}}>{shopDetail.nameShop}</Text>
        </View>
        <Text style={{marginTop: 10, fontSize: 12, color: gColors.description}}>{shopDetail.descriptionShop}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gColors.background,
  }
})
