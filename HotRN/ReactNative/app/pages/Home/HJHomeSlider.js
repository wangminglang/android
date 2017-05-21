'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  ListView
} from 'react-native';

export default class HomeSlider extends React.PureComponent {



  static defaultProps = {
  };
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      this.state = {
        dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ]),
        selectedKind:0
      };
  };


  render() {
    return (
      <View style={styles.containStyle}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  renderRow(rowData,sectionID,rowID){
    return(
      <TouchableOpacity activeOpacity={0.5} onPress={()=>this._selectedKind(rowID)}>
      <View style={styles.topClickStyle}>
        {this.renderItem(rowID)}
      </View>
      </TouchableOpacity>
    )
  }
  renderItem(rowID){
    if (rowID == this.state.selectedKind) {
      return(
        <Text style={styles.topTextStyle}>{rowID}</Text>
      )
    }else {
      return(
        <Text>{rowID}</Text>
      )
    }
  }

  _selectedKind(rowID){
    this.setState({
      selectedKind:rowID,
    });
    alert(rowID);
  }



}
const styles = StyleSheet.create({
  containStyle:{
    flex:1,
    marginLeft:10,
    marginRight:10,
  },

  SeparatorComponent:{
    height:10,
    backgroundColor:'#dddddd'
  },
  topClickStyle:{
    height:30,
    width:60,
    marginRight:5,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center'
  },
  topTextStyle:{
    borderBottomWidth:2,
    borderBottomColor:'blue',
    color:'white',
  }
})
