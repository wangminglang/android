'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

const imageScale = 0.533;

export default class HomeListCell extends React.Component{
  static defaultProps = {
    Item:Object,
  }

  render() {
    return (
      <View style={styles.cellStyle}>
        <Image source={{uri:this.props.Item.image}} style={styles.topImageStyle}/>

        <Text style={styles.centerTextStyle}>
          {this.props.Item.title}
        </Text>

        <View style={styles.bottomStyle}>
          <Text style={styles.priceStyle}>
            {'¥'+this.props.Item.minPrice}
          </Text>
          <View style={styles.groupUserStyle}>
            {this._renderUser()}
            <TouchableOpacity key={this.props.Item.id} onPress={() => this.cellClick(this.props.Item.id)}>
              <Text style={styles.pinButtonStyle}>
                去拼团
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  }
  _renderUser(){
    var arr = [];
    for (var i = 0; i < this.props.Item.groupUser.length; i++) {
      var user = this.props.Item.groupUser[i];
      arr.push(
        <TouchableOpacity key={user.userId} onPress={() => this.cellClick(this.props.user.userId)}>
        <Image style={styles.userStyle} source={{uri:user.headUrl}}/>
        </TouchableOpacity>

      )
    }
    return arr;
  }

  cellClick(data){
    alert(data);
  }
}

const styles = StyleSheet.create({
    cellStyle:{
      backgroundColor:'white',
      // height:50
    },
    topImageStyle:{
      height:global.gScreen.width*imageScale,
      width:global.gScreen.width,
    },
    priceStyle:{
      color:'red',
      position:'absolute',
      left:15,
      bottom:25,
      fontSize:18
    },
    groupUserStyle:{
      flexDirection:'row',
      position:'absolute',
      right:15,
      bottom:15
    },
    userStyle:{
      width:40,
      height:40,
      backgroundColor:'white',
      borderWidth:1,
      borderRadius:20,
      borderColor:'#dddddd',
      marginRight:5
    },
    pinButtonStyle:{
      color:'white',
      padding:10,
      backgroundColor:'red',
      paddingLeft:30,
      paddingRight:30,
    },
    bottomStyle:{
      flexDirection:'row',
    },
    centerTextStyle:{
      marginTop:10,
      marginBottom:65,
      width:global.gScreen-10,
      marginLeft:5
    }
});
