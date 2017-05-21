'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  ListView,
  TouchableOpacity,
  FlatList
} from 'react-native';

import HomeListCell from './HJHomeCell';
import LoopView from '../../components/HJLoopView'

export default class HomeList extends React.PureComponent {



  static defaultProps = {
        headLunbo:[],
        dataSource: [],
        callBack: null
  };
  // 初始化模拟数据
  constructor(props) {
    super(props);
    this.state = {
    };
  };


  render() {
    return (
      <View style={styles.containStyle}>
        <FlatList
          data={this.props.dataSource}
          renderItem={this.renderRow}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={()=>this._ItemSeparatorComponent()}
          onEndReachedThreshold={()=>this._onEndReachedThreshold()}
          ListHeaderComponent={()=>this._ListHeaderComponent()}
        />
      </View>
    );
  }

  renderRow(rowData){
    return(
      <HomeListCell Item={rowData.item}/>
    )
  }

  _keyExtractor(data,index){

    return index;
  }

  _ItemSeparatorComponent(){
    return(
      <View style={styles.SeparatorComponent}>
      </View>
    )
  }

  _ListHeaderComponent(){
    return(
      <LoopView dataSource={this.props.headLunbo}/>
    )
  }

  _onEndReachedThreshold(){

  }


}
const styles = StyleSheet.create({
  containStyle:{
    flex:1,
  },

  SeparatorComponent:{
    height:10,
    backgroundColor:'#dddddd'
  },
})
