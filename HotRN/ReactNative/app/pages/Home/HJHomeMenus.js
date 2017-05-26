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
  TouchableOpacity
} from 'react-native';


export default class HomeMenus extends React.Component {


  static defaultProps = {
    list :[],
    callBack:Object,
    kind:0,
    seletedType:''
  };

  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      seletedType:this.props.seletedType,
    }
  };

  componentDidMount() {

  }


  render() {
    return (
      <View style={styles.containStyle}>
        <ListView
          dataSource={this.ds.cloneWithRows(this.props.list)}
          renderRow={this.renderRow.bind(this)}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          enableEmptySections={true}
        />
      </View>
    );
  }


  renderRow(rowData,sectionID,rowID){

    return(
      <TouchableOpacity activeOpacity={0.98} onPress={()=>this.clickCell(rowID)}>
      <View style={styles.cellStyle}>
        <View style={styles.cellSpetor}/>
        <View style={styles.cellContentViewStyle}>
          {this.renderText(rowData,rowID)}
        </View>
      </View>
      </TouchableOpacity>

    )
  }
  renderText(rowData,rowID){

    if (this.props.kind === 0) {

      if (this.state.seletedType === rowID) {
        return(
          <Text style={[styles.seletedTypeStyle,styles.cellTextStyle]}>
            {rowData.title}
          </Text>
        );
          
      }else{
        return (
          <Text style={[styles.cellTextStyle]}>
            {rowData.title}
          </Text>
        )
      }
      
    }
    else if (this.props.kind === 1){

      if (this.state.seletedType === rowID) {
        return (
          <Text style={[styles.seletedTypeStyle,styles.cellTextStyleS]}>
            {rowData.className}
          </Text>
        )

      }else{
        return (
          <Text style={styles.cellTextStyleS}>
            {rowData.className}
          </Text>
        )        
      }

    }
  }

  clickCell(rowID){
    this.props.callBack(this.props.kind,rowID);
    this.setState({
      seletedType:rowID,
    })
  }
}

const styles = StyleSheet.create({
  containStyle:{
    flex:1
  },
  cellStyle:{
    width:gScreen.width,
    height:40,
    // justifyContent:'center',
    backgroundColor:'white',
    // alignItems:'center'
  },
  cellSpetor:{
    width:gScreen.width,
    height:1,
    backgroundColor:'#dddddd'
  },
  cellContentViewStyle:{
    width:gScreen.width,
    height:40,
    justifyContent:'center',
  },
  cellTextStyle:{
    marginLeft:15
  },
  cellTextStyleS:{
    alignSelf:'flex-end',
    marginRight:15,
  },
  seletedTypeStyle:{
    color:'red'
  }

 });

