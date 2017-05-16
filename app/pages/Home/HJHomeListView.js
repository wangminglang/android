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

export default class HomeList extends React.PureComponent {



  static defaultProps = {
        dataSource: [],
        callBack: null
  };
  // 初始化模拟数据
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  };


  render() {
    return (
      <View style={styles.containStyle}>
        <FlatList
          data={this.props.dataSource}
          renderItem={this.renderRow}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          onEndReachedThreshold={this._onEndReachedThreshold}
        />
      </View>
    );
  }

  renderRow(rowData){
    console.log(rowData);
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
  _onEndReachedThreshold(){

  }

  componentDidMount(){

    global.NetUtil.GET("http://192.168.1.248:957/buyerapi/home/getHomeAllClassFirstPageData",(data)=>this.successCallback(data),null);
  }

  successCallback(data){
    // console.log(data);
  }

  loadData(data){

    if (data.result) {

      this.setState({
        dataSource:data.data
      });
    }
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
