'use strict';

import React,{Component, PureComponent} from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  TouchableOpacity,
  Image,
  Text,
  FlatList
} from 'react-native';

import {observer} from 'mobx-react/native';
import ShopStore from '../../mobx/HJBaseListStore';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import LoadMoreFooter from '../../components/LoadMoreFooter';
import GlobalContants from '../../common/globalConstants';
import * as Api from './../../common/api';
import {tabStatus} from '../../HJMain'

@observer
export default class Shop extends React.Component {

  static navigationOptions = (navigation) => ({
      header: <Header title='店铺详情' />
  })


  constructor(props){
    super(props);
    this.shopListStore = new ShopStore(Api.GET_SHOPS_LIST);
  };

  render() {
    const {isFetching, isRefreshing, listData} = this.shopListStore;
    return (
      <View style={styles.container} >
        <Loading isShow={isFetching} />
        {!isFetching &&
        <FlatList
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
      </View>
    );
  }

  _renderItem = ({item, index}) => {
    return <ShopItem data={item} onPress={this._onPressCell} />
  }

  _renderSeparator = () => {
    return <View style={{width: gScreen.width, height: 1*gScreen.onePix, backgroundColor: gColors.background}} />
  }

  _renderFooter = () => {
    return <LoadMoreFooter isNoMore={this.shopListStore.isNoMore} />
  }

  _onEndReach = () => {
    this.shopListStore.loadMoreListData();
  }

  _onRefresh = () => {
    this.shopListStore.refreshListData();
  }

  _onPressCell = (data) => {
    const {navigate} = this.props.navigation;
    navigate('ShopDetail', data);
  }
  componentWillMount() {
    tabStatus.show();
  }
  componentDidMount() {
  }

}

class ShopItem extends PureComponent {
  static propTypes = {
    data: React.PropTypes.object,
    onPress: React.PropTypes.func
  }

  render() {
    const {data} = this.props;
    return(
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.cell}
        onPress={this._onPress}
      >
        <View style={styles.topView} >
          <Image source={data.image ? {uri: data.image} : require('../../images/mr_dianputouxiang.jpg')} style={styles.leftIcon} />
          <View style={styles.rightView}>
            <Text numberOfLines={1} style={styles.name}>{data.nameShop}</Text>
            <Text numberOfLines={1} style={styles.description}>{data.descriptionShop}</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          {data.goodsList.map((item, i) => {
            const itemWidth = (gScreen.width - 60)/3 - 9;
            return (
              <View style={{marginRight: 9, width: itemWidth}} key={i}>
                <Image source={item.image ? {uri: item.image} : require('../../images/mr_dianpushangpin.jpg')} style={{width: itemWidth, height: itemWidth}} />
                <Text numberOfLines={1} style={{color: '#ea4355', fontSize: 12, width: itemWidth, textAlign: 'center', marginTop: 10}} >￥{item.price}</Text>
              </View>
            )
          })

          }
        </View>
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
    backgroundColor: gColors.background
  },
  cell: {
    width: gScreen.width, 
    backgroundColor: gColors.white
  },
  topView: {
    flexDirection: 'row',
    paddingHorizontal: 9, 
    paddingTop: 12, 
    paddingBottom: 11,
  },
  leftIcon : {
    width: 42, 
    height: 42
  },
  rightView: {
    marginLeft: 10,
    width: gScreen.width - 70
  },
  title: {
    fontSize: 16,
    color: gColors.title
  },
  description: {
    fontSize: 13,
    color: gColors.description,
    marginTop: 14
  },
  bottomView: {
    paddingLeft: 60,
    paddingBottom: 20,
    flexDirection: 'row'
  }
})

