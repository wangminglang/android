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
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import Header from '../../components/Header';
import Util from '../../common/HJNetUtil';
import {observer} from 'mobx-react/native';
import GoodsStore from '../../mobx/HJGoodsListStore';
import Loading from '../../components/Loading';
import LoadMoreFooter from '../../components/LoadMoreFooter';

const ShopDetailUrl = gBaseUrl.baseUrl + 'buyerapi/shop/getShopsDetail';
const GoodsListUrl = gBaseUrl.baseUrl + 'buyerapi/goods/getGoodsList';

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
    header: <Header title={navigation.state.params.nameShop} showLeftIcon={true} leftIconAction={() => navigation.goBack()} />
  })

  constructor(props) {
    super(props);
    this.state = {
      shopDetail: {}
    }
    const {params} = this.props.navigation.state;
    this.goodsListStore = new GoodsStore(GoodsListUrl, params.id);
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
    const {isFetching, isRefreshing, listData} = this.goodsListStore;
    return (
      <View style={styles.container}>
        <TopView shopDetail={shopDetail} />
        <GoodsSortHandleView shopDetail={shopDetail} sortTypes={sortTypes} onSelectSortType={this._onSelectSortType} />
        {!isFetching &&
            <ScrollView
                ref='scroll'
                automaticallyAdjustContentInsets={false}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
                onMomentumScrollEnd={this._onMomentumScrollEnd}
                bounces={true}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={this._onRefresh}
                        colors={['rgb(217, 51, 58)']}
                    />
                }
            >
                <View style={styles.contentContainer}>
                    {listData.map((itemData, i) => {
                        return (
                            <GoodsItem key={i} data={itemData} />
                        )
                    })}
                </View>
                <LoadMoreFooter isNoMore={this.goodsListStore.isNoMore} />
            </ScrollView>
          }
          <Loading isShow={isFetching} />
      </View>
    );
  }

  _onSelectSortType = (type) => {
    const { title, typeNum } = type;
    this.goodsListStore.sortType = typeNum;
    this.goodsListStore.fetchListData();
  }

  _onMomentumScrollEnd = () => {
        if (!this.goodsListStore.isNoMore) {
            this.goodsListStore.page++;
            this.goodsListStore.fetchListData();
        }
  }

  _onRefresh = () => {
        this.goodsListStore.isRefreshing = true;
        this.goodsListStore.fetchListData();
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

const GoodsItem = ({
  data
}) => {
  return(
    <TouchableOpacity
            activeOpacity={0.75}
            style={[styles.item]}
    >
            <Image style={{width: (gScreen.width-2)/2-10, height: (gScreen.width-2)/2-10}} source={data.image ? {uri: data.image} : require('../../images/dianpushangpin.jpg')} />
        <Text style={{fontSize: 13, color: gColors.title, }}>{data.title}</Text>  
            <Text style={{fontSize: 13, color: gColors.red}}>￥{data.price}</Text>
        </TouchableOpacity>
  )
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
    width: (gScreen.width - 4)/2,
    marginTop: 2,
    alignItems: 'center'
  }

})