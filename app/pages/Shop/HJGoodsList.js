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
  FlatList,
  InteractionManager
} from 'react-native';

import {observer} from 'mobx-react/native';
import GoodsStore from '../../mobx/HJGoodsListStore';
import LoadMoreFooter from '../../components/LoadMoreFooter';
import * as Api from './../../common/api';
import Loading from '../../components/Loading';

@observer
export default class GoodsList extends React.PureComponent {

  constructor(props) {
    super(props);
    const { shopDetail } = this.props;
    this.goodsListStore = new GoodsStore(Api.GET_GOODS_LIST, shopDetail.id);
  }

  render() {
    const {isFetching, isRefreshing, listData} = this.goodsListStore;
    return (
    	<View style={styles.container}>
		    {!isFetching &&
		    <FlatList
		    	  ref='flatList' 
		        numColumns={2}
		        data={listData.slice(0)}
            horizontal={false}
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

  _changeSortType = (typeNum) => {
    this.goodsListStore.sortType = typeNum;
    this.refs.flatList.scrollToOffset({animated: false, offset: 0})
    this.goodsListStore.refreshListData();
  }

  _onEndReach = () => {
    this.goodsListStore.loadMoreListData();
  }

  _onRefresh = () => {
    this.goodsListStore.refreshListData();
  }

  _renderItem = ({item, index}) => {
    return <GoodsItem index={index} data={item} onPress={this._onPressCell} />
  }

  _renderFooter = () => {
    return <LoadMoreFooter isNoMore={this.goodsListStore.isNoMore} />
  }

  _onPressCell = (id) => {
    const { goodsItemClick } = this.props;
    goodsItemClick && goodsItemClick(id);
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
    onPress && onPress(data.id);
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
