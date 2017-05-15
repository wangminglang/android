'use strict';

import React,{Component, PureComponent} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  RefreshControl,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';

import {observer} from 'mobx-react/native';
import ShopStore from '../../mobx/HJBaseListStore';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import LoadMoreFooter from '../../components/LoadMoreFooter';

const URL = 'http://192.168.1.248:957/buyerapi/shop/getShopsList';

@observer
export default class Shop extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }

    this.shopListStore = new ShopStore(URL);

  };

  render() {
    const {isFetching, isRefreshing, listData} = this.shopListStore;
    return (
      <View style={styles.container} >
        <Header title='店铺' />
        <Loading isShow={isFetching} />
        {!isFetching &&
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(listData.slice(0))}
          renderRow={this._renderRow}
          renderFooter={this._renderFooter}
          enableEmptySections={true}
          initialListSize={2}
          onEndReached={this._onEndReach}
          onEndReachedThreshold={30}
          refreshControl={
            <RefreshControl 
              refreshing={isRefreshing}
              onRefresh={this._onRefresh}
              colors={['rgb(217, 51, 58)']}
            />
          }
        />
        }
      </View>
    );
  }

  _renderRow = (data) => {
    return <ShopItem data={data} onPress={this._onPressCell} />
  }

  _renderFooter = () => {
    return <LoadMoreFooter isNoMore={this.shopListStore.isNoMore} />
  }

  _onEndReach = () => {

  }

  _onRefresh = () => {

  }

  _onPressCell = (data) => {

  }

}

class ShopItem extends PureComponent {
  static propTypes = {
    data: React.PropTypes.object,
    onPress: React.PropTypes.func
  }

  render() {
    const {data} = this.props;
    alert(gScreen.onePix)
    return(
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.cell}
        onPress={this._onPress}
      >
        <View style={styles.topView} >
          <Image source={{uri: data.image}} style={styles.leftIcon} />
          <View style={styles.rightView}>
            <Text numberOfLines={1} style={styles.name}>{data.nameShop}</Text>
            <Text numberOfLines={1} style={styles.description}>{data.descriptionShop}</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          {data.goodsList.map((item, i) => {
            return (
              <View style={{marginRight: 9, width: 96}} key={i}>
                <Image source={{uri: item.image}} style={{width: 96, height: 96}} />
                <Text style={{color: '#ea4355', fontSize: 12, width: 96, textAlign: 'center', marginTop: 10}} >￥{item.price}</Text>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: gColors.background
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
    color: '#333333'
  },
  description: {
    fontSize: 13,
    color: '#7f7f7f',
    marginTop: 14
  },
  bottomView: {
    paddingLeft: 60,
    paddingBottom: 20,
    flexDirection: 'row'
  }
})

