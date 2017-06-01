'use strict';

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import GoodsList from './HJGoodsList';

export default class SortHandleView extends PureComponent {
  constructor(props){
    super(props);
    //分析数据
    this.state = {
      fadeInOpacity : new Animated.Value(0),
      height: new Animated.Value(0),
      selectedIndex : 0,
      isShow: false
    }
  }

  render() {
    const { selectedIndex } = this.state;
    const { sortTypes, shopId, goodsItemClick, total } = this.props;
    let title = sortTypes[selectedIndex].title;
    return (
      <View style={{flex:1}}>
        <HandleView total={total} title={title} handleViewClick={this._toggle} isShow={this.state.isShow} />

        <GoodsList ref='goodsList' shopId={shopId} goodsItemClick={goodsItemClick} />

        <View style={styles.bgContainer} pointerEvents={this.state.isShow ? 'auto' : 'none'} >
          <Animated.View style={[styles.bg, {opacity:this.state.fadeInOpacity}]} />
          <Animated.View style={[styles.content, {height: this.state.height}]}>
            <ScrollView style={styles.scroll}>
              {sortTypes.map((sortType, index) => {
                return  <Cell 
                          sortType={sortType} 
                          key={index} 
                          index={index} 
                          selected={selectedIndex == index}
                          cellClick={this._cellClick}
                        />
              })}
            </ScrollView>
          </Animated.View>
        </View>
      </View>
    );
  }

  _cellClick = (index) => {
    const {sortTypes} = this.props;
    this.refs.goodsList._changeSortType(sortTypes[index].typeNum);
    this.setState({
      selectedIndex: index
    })
    this._toggle();
  }

  _toggle=()=>{
    this.state.isShow ? 
    Animated.parallel([this._createAnimation(0), this._createFade(0)]).start() :
    Animated.parallel([this._createAnimation(250), this._createFade(1)]).start()

    this.setState({
      isShow: !this.state.isShow
    })
  }

  _createAnimation=(value)=>{
    return Animated.timing(                 
        this.state.height,               
        {
          toValue: value,                 
          duration : 250
        }
      );
  }

  _createFade=(value)=>{
    return Animated.timing(                 
        this.state.fadeInOpacity,               
        {
          toValue: value,                 
          duration : 250, 
        }
      );
  }
}

const HandleView = ({
  total,
  title,
  handleViewClick,
  isShow
}) => {
  let onPress = () => {
    handleViewClick && handleViewClick()
  }

  return (
    <View style={styles.sortView} >
      <Text style={styles.sortViewText} >全部商品（{total}）</Text>
      <TouchableOpacity
        activeOpacity={0.75}
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={onPress}
      >
        <Text style={styles.sortViewText} >{title}</Text>
        <Image style={{height: 6, width: 13, marginLeft: 5}} source={isShow ? require('../../images/ico_up.png') : require('../../images/ico_down.png')} />
      </TouchableOpacity>
    </View>
  )
}

const Cell = ({
  sortType,
  index,
  selected,
  cellClick
}) => {
  const {title, typeNum} = sortType;
  const titleStyle = [{fontSize: 14, color: gColors.description}];
  if (selected) titleStyle.push({color: '#ea4335'});

  let onPress = () => {
    cellClick && cellClick(index)
  }

  return (
    <TouchableOpacity
        activeOpacity={0.95}
        style={styles.sortTypeItem}
        onPress={onPress}
    >
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  scroll:{
    flex:1, 
    backgroundColor:'#fff'
  },
  bgContainer:{
    position:'absolute', 
    top:55, 
    width:gScreen.width, 
    height:gScreen.height
  },
  bg:{
    flex:1, 
    backgroundColor:'rgba(50,50,50,0.5)'
  },
  content:{ 
    position:'absolute',
    width: gScreen.width
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
  sortTypeItem: {
    backgroundColor: gColors.white,
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: gColors.background
  },
});