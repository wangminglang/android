'use strict';

import React,{Component, PureComponent} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Animated,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Header from '../../components/Header';
import Util from '../../common/HJNetUtil';
import {observer} from 'mobx-react/native';
import GoodsStore from '../../mobx/HJGoodsListStore';
import Loading from '../../components/Loading';
import LoadMoreFooter from '../../components/LoadMoreFooter';
import * as Api from './../../common/api';

const sortTypes = [
  {title: '综合排序', typeNum: 0},
  {title: '销量排序', typeNum: 1},
  {title: '最新上架', typeNum: 2},
  {title: '价格从低到高', typeNum: 3},
  {title: '价格从高到低', typeNum: 4}
];

@observer
export default class ShopDetail extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false, //隐藏tabBar
    header: <Header title={navigation.state.params.nameShop} showLeftIcon={true} leftIconAction={() => navigation.goBack()} />
  })

  constructor(props) {
    super(props);
    this.state = {
      shopDetail: {}
    }
    const {params} = this.props.navigation.state;
    this.goodsListStore = new GoodsStore(Api.GET_GOODS_LIST, params.id);
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    Util.POST(Api.GET_SHOPS_DETAIL, {id: params.id}, (responseData) => {
      this.setState({
        shopDetail : responseData.data
      })
    })

  }

  render() {
    const { shopDetail } = this.state;
    const {isFetching, isRefreshing, listData} = this.goodsListStore;
    return (
      <View style={styles.container}>
        <TopView shopDetail={shopDetail} />
        <GoodsSortHandleView shopDetail={shopDetail} sortTypes={sortTypes} onSelectSortType={this._onSelectSortType} />
        {!isFetching &&
          <FlatList
            numColumns={2}
            data={listData.slice(0)}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._renderSeparator}
            ListFooterComponent={this._renderFooter}
            onEndReached={this._onEndReach}
            onEndReachedThreshold={0}
            onRefresh={this._onRefresh}
            refreshing={isRefreshing}
            keyExtractor={(item, index) => index}
          />
        }
        <Loading isShow={isFetching} />
      </View>
    );
  }

  _onEndReach = () => {
    if (!this.goodsListStore.isNoMore) {
      this.goodsListStore.page++;
      this.goodsListStore.fetchListData();
    }
  }

  _onRefresh = () => {
    this.goodsListStore.isRefreshing = true;
    this.goodsListStore.fetchListData();
  }

  _renderItem = ({item, index}) => {
    return <GoodsItem index={index} data={item} onPress={this._onPressCell} />
  }

  _renderFooter = () => {
    return <LoadMoreFooter isNoMore={this.goodsListStore.isNoMore} />
  }

  _onSelectSortType = (type) => {
    const { title, typeNum } = type;
    this.goodsListStore.sortType = typeNum;
    this.goodsListStore.fetchListData();
  }

  _onPressCell = () => {
    this.props.navigation.setParams({
      nameShop: 'bbb'
    })
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
        shopDetail: React.PropTypes.object
    }

    state = {
        isShow: false,
        currentType: '综合排序'
    }

    render() {
      const {sortTypes, shopDetail} = this.props;
      const {isShow, currentType} = this.state;
      const rotate = isShow ? '90deg' : '-90deg';

      return(
        <View style={{zIndex: 1}}>
          <View style={[styles.sortView]} >
            <Text style={styles.sortViewText} >全部商品（{shopDetail.total}）</Text>
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
      const {title, typeNum} = type;
      const {currentType} = this.state;
      const isLast = sortTypes.length - 1 == key;
      const titleStyle = [{fontSize: 14, color: gColors.description}];
      if (currentType == title) titleStyle.push({color: '#ea4335'})
      return (
          <TouchableOpacity
              key={key}
              activeOpacity={0.95}
              style={[styles.sortTypeItem, isLast && {width: gScreen.width}]}
              onPress={() => this._onPressSortTypeCell(type)}
          >
              <Text style={titleStyle}>{title}</Text>
          </TouchableOpacity>
      )
    }

    _onPressSortTypeCell = (type) => {
      const {title, typeNum} = type;
      this.setState({
        isShow: false,
        currentType: title
      })

      this.props.onSelectSortType && this.props.onSelectSortType(type);
    }
}

class GoodsItem extends PureComponent {
  static propTypes = {
    data: React.PropTypes.object,
    onPress: React.PropTypes.func,
    index: React.PropTypes.number
  }

  render() {
    const {data, index} = this.props;
    let marginLeft = index%2 ==0 ? 0 : 2;
    return(
      <TouchableOpacity
        activeOpacity={0.75}
        style={[styles.item, {marginLeft:marginLeft}]}
        onPress={this._onPress}
      >
        <Image style={{width: (gScreen.width-2)/2-10, height: (gScreen.width-2)/2-10}} source={data.image ? {uri: data.image} : require('../../images/dianpushangpin.jpg')} />
        <Text style={{fontSize: 13, color: gColors.title, }}>{data.title}</Text>  
          <Text style={{fontSize: 13, color: gColors.red}}>￥{data.price}</Text>
      </TouchableOpacity>
    )
  }

  _onPress = () => {
    const {data , onPress} = this.props;
    onPress && onPress(data);
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
  },
  contentContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      overflow: 'hidden',
      justifyContent: 'space-between'
  },
  item: {
    padding: 5,
    paddingBottom: 15,
    backgroundColor: gColors.white,
    width: (gScreen.width - 2)/2,
    marginTop: 2,
    alignItems: 'center'
  }

})
