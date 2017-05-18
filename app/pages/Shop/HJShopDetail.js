'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Animated,
  TouchableOpacity
} from 'react-native';
import Header from '../../components/Header';
import Util from '../../common/HJNetUtil';

const ShopDetailUrl = gBaseUrl.baseUrl + 'buyerapi/shop/getShopsDetail';
const GoodsListUrl = gBaseUrl.baseUrl + 'buyerapi/goods/getGoodsList';

const sortTypes = ['综合排序', '销量排序', '最新上架', '价格从低到高', '价格从高到低'];


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
        <GoodsSortHandleView sortTypes={sortTypes} onSelectSortType={this._onSelectSortType} />
      </View>
    );
  }

  _onSelectSortType = (type) => {
    alert(type)
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


class GoodsSortHandleView extends Component {
    static propTypes = {
        sortTypes: React.PropTypes.array,
        onSelectSortType: React.PropTypes.func,
    }

    state = {
        isShow: false,
        currentType: '综合排序'
    }

    render() {
      const {sortTypes} = this.props
      const {isShow, currentType} = this.state;
      const rotate = isShow ? '90deg' : '-90deg';

      return(
        <View style={{zIndex: 1}}>
          <View style={[styles.sortView]} >
            <Text style={styles.sortViewText} >全部商品（20）</Text>
            <TouchableOpacity
              activeOpacity={0.75}
              style={{flexDirection: 'row'}}
              onPress={this._show}
            >
              <Text style={styles.sortViewText} >{currentType}</Text>
              <Image source={require('../../images/ic_back_dark.png')} style={{width: 12, height: 12, transform: [{rotate}]}} />
            </TouchableOpacity>
          </View>
          {isShow && 
            <View style={styles.animatedCover} >
              <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={this._show}>
                <View>
                  {sortTypes.map(this._renderSortTypeCell)}
                </View>
              </TouchableOpacity>
            </View>
          }
        </View>
      )
    }

    _show = () => {
      this.setState({
        isShow: !this.state.isShow
      })
    }

    _renderSortTypeCell = (type, key) => {
      const {sortTypes} = this.props;
      const {currentType} = this.state;
      const isLast = sortTypes.length - 1 == key;
      const titleStyle = [{fontSize: 14, color: gColors.description}];
      if (currentType == type) titleStyle.push({color: '#ea4335'})
      return (
          <TouchableOpacity
              key={key}
              activeOpacity={0.75}
              style={[styles.sortTypeItem, isLast && {width: gScreen.width}]}
              onPress={() => this._onPressSortTypeCell(type)}
          >
              <Text style={titleStyle}>{type}</Text>
          </TouchableOpacity>
      )
    }

    _onPressSortTypeCell = (type) => {
      this.setState({
        isShow: false,
        currentType: type
      })

      this.props.onSelectSortType && this.props.onSelectSortType(type);
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gColors.background,
  },
  sortView: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: gColors.white,
    padding: 15,
    justifyContent: 'space-between'
  },
  sortViewText:{
    fontSize: 14,
    color: gColors.title
  },
  animatedCover: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    height: gScreen.height,
    backgroundColor: 'rgba(1, 1, 1, 0.15)'
  },
  sortTypeItem: {
    backgroundColor: gColors.white,
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: gColors.background
  }

})
