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
  Animated,
  TouchableOpacity,
  FlatList
} from 'react-native';

import {observer} from 'mobx-react/native';

import * as Api from '../../common/api';
import Loading from '../../components/Loading';


@observer
export default class HomeCategoryList extends React.Component {

  static defaultProps = {
      list :[],
      callBack:Object,
      listStore:Object,
      onEndReached:Object,
      onRefresh:Object,  
    };

  render() {
    const {listData,loading} = this.props.listStore;
    return (
      <View style={styles.containStyle}>
        <FlatList
            numColumns={2}
            data={listData.slice()}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._renderSeparator}
            ListFooterComponent={this._renderFooter}
            onEndReached={()=>this._onEndReach()}
            onEndReachedThreshold={0.1}
            onRefresh={()=>this._onRefresh()}
            refreshing={false}
            keyExtractor={(item, index) => index}
          />
      <Loading isShow={loading} />
      </View>
    );
  }

  _renderItem(rowData){
    return(
      <HomeCategoryListCell Item={rowData.item}/>
    )
  }

  _renderSeparator(){
    return(
      <View style={styles.SeparatorComponent}>
      </View>
    )
  }

  _onRefresh(){
    this.props.onRefresh();
  }

  _onEndReach(){
    this.props.onEndReached();
  }
  _renderFooter(){
    return(
      <View style={styles.SeparatorComponent}>
      </View>
    )
  }
}




const styles = StyleSheet.create({
  containStyle:{
    flex:1,
  },
  SeparatorComponent:{
    height:1,
    backgroundColor:'#dddddd'
  },
  HomeCategoryListCellStyle:{
    flex:1,
    alignItems:'center',
    backgroundColor:'white'
  },
  cellImageStyle:{
    width:gScreen.width/2.0-4,
    height:gScreen.width/2.0-4,
    marginTop:2,
    marginLeft:2,
  },
  cellMiddleTextStyle:{
    marginTop:10,
    marginBottom:35,
    marginLeft:5,
    marginRight:5,
  },
  cellBottomTextImageStyle:{
    color:'red',
    position:'absolute',
    bottom:10,

  }
})

export class HomeCategoryListCell extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
  };

  render(){
    return(
      <View style={styles.HomeCategoryListCellStyle}>
        <Image source={{uri:this.props.Item.image}} style={styles.cellImageStyle}/>
        <Text style={styles.cellMiddleTextStyle}>
          {this.props.Item.title}
        </Text>
        <Text style={styles.cellBottomTextImageStyle}>
          {'¥'+this.props.Item.minPrice}
        </Text>
      </View>
    );
  }
}



