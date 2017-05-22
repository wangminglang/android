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


//待办事项行数据
class TodoListItem {

    index;

    @observable
    title;

    @observable
    seleted = false;

    @action
    toggleFinish() {
        if (!this.seleted) {this.seleted = true}
    }    
}

//待办事项列表数据
class TodoListHolder {
    @observable
    dataList = [];
    @computed
    get taskLeft() {
        return this.dataList.filter((it) => it.seleted == true);
    }
    @action
    clear(){}
}



@observer
export default class HomeSlider extends React.Component {

  todoList = new TodoListHolder();



  static defaultProps = {
      list :[
          'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ]
  };

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  pre = 0;

  // 初始化模拟数据
  constructor(props) {
    super(props);
    for (let i = 0; i < this.props.list.length; i++) {
            let listItem = new TodoListItem();
            if (i == 0) {listItem.seleted = true}
            listItem.title = this.props.list[i];
            listItem.index = i;
            this.todoList.dataList.push(listItem)
        }

    autorun(() => {
    var arr = this.todoList.dataList.filter((it) => it.seleted == true);
    var c = 0;
    if (arr.length>1) 
    {
        console.log('保持的',this.pre);

      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];

        if (item.index === this.pre) {
          console.log('上一个',this.pre);
          this.todoList.dataList[this.pre].seleted = false;
        }else{
          c = item.index;
          console.log('现在的',this.pre);
        }

      }
      this.pre = c;
       console.log('-----------')

    }
  })

  };
   

  render() {
    return (
      <View style={styles.containStyle}>
        <ListView
          dataSource={this.ds.cloneWithRows(this.todoList.dataList.slice())}
          renderRow={this.renderRow.bind(this)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  renderRow(rowData,sectionID,rowID){
    return(
      <Item rowData={rowData} callBack={this.callBack}/>
    )
  }

  callBack(){}
  
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

@observer
export class Item extends React.Component {
  render(){
    return(
      <TouchableOpacity activeOpacity={0.5} onPress={()=>this.props.rowData.toggleFinish()}>
      <View style={styles.topClickStyle}>
      {this.renderItem()}
      </View>
      </TouchableOpacity>
    )
  }

  renderItem(){

    if (this.props.rowData.seleted) {
      return(
        <Text style={styles.topTextStyle}>{this.props.rowData.title}</Text>
      )
    }else {
      return(
        <Text>{this.props.rowData.title}</Text>
      )
    }
  }
}


