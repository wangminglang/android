'use strict';

import {observable, computed, action, runInAction,autorun} from 'mobx';

import React,{Component} from 'react';
import {observer} from 'mobx-react/native';

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


class MyState {
  @observable index = 0;
  @action setIndex = (index) => {


    this.index = index;

  };
}
// const index = observable(0)
const newState = new MyState();

// autorun(() => {
//   console.log(index.get());
// });





@observer
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
        // selectedKind:0
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
        // alert(newState.index);

    if (rowID == newState.index) {
      return(
        <Text style={styles.topTextStyle}>{newState.index}</Text>
      )
    }else {
      return(
        <Text>{newState.index}</Text>
      )
    }
  }

  _selectedKind(rowID){
    // newState.index = rowID;
    // this.setIndex(rowID);
    newState.setIndex(rowID);
  }

  // @action 
  // setIndex = (rowID)=>{
  //   runInAction(() => {
  //     index.set(rowID);
  //     alert(index.get());
  //   });
     
  // }



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
