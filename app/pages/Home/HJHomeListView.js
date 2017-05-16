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

export default class HomeList extends React.Component {



  static defaultProps = {
        dataSource: [],
        callBack: null
  };
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: []
    };
  };


  render() {
    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderRow}
        />
      </View>
    );
  }

  renderRow(rowData){
    return(
      <Text>
        1
      </Text>
    )
  }

  componentDidMount(){

    global.NetUtil.POST("http://119.2.8.83:888/api/index_app/lunbo", {'source': '0'}, (data)=>this.loadData(data));
  }

  loadData(data){
    if (data.result) {

      this.setState({
        dataSource:data.data
      });
    }
  }
}
