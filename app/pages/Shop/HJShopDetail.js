'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import Util from '../../common/HJNetUtil';
import {observable, computed, action, runInAction} from 'mobx';
import {observer} from 'mobx-react/native';

const ShopDetailUrl = gBaseUrl.baseUrl + 'buyerapi/shop/getShopsDetail';

export default class ShopDetail extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    header: <Header title={navigation.state.params.nameShop} showLeftIcon={true} leftIconAction={() => navigation.goBack()} />
  })

  constructor(props) {
    super(props);
    this.state = {
      shopDetail: {}
    }
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    Util.POST(ShopDetailUrl, {id: params.id}, (responseData) => {
      this.setState({
        shopDetail : responseData.data
      })
    })

  }

  render() {
    const { shopDetail } = this.state;
    return (
      <View style={styles.container}>
        <TopView shopDetail={shopDetail} />
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
