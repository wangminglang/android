'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TextInput
} from 'react-native';

import LoopView from '../../components/HJLoopView'


export default class Home extends React.Component {



  constructor(props){
    super(props);
    this.state = {link:'link'};
  };



  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderTextInput()}
        {this.renderSliderView()}
        {this.renderLoopView()}
      </View>
    );
  }

  renderTextInput(){
    return(
      <View style={styles.searchBarViewStyle}>
        <TextInput
         multiline = {true}
         numberOfLines = {4}
         onChangeText={(text) => this.setState({text})}
         value={this.state.text}
         style={styles.textInputStyle}
         placeholder="搜索全部"
       />
      </View>
    )
  }

  renderNavBar(){
    return(
      <View style={styles.navBarStyle}>
        <Text>
          好价
        </Text>
      </View>
    )
  }

  renderSliderView(){
    return(
      <View style={styles.sliderViewStyle}>
      </View>
    )
  }

  renderLoopView(){
    return(
      <LoopView />
    )
  }

  componentDidMount(){
  }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dddddd',
    },
    textInputStyle:{
      height:30,
      width:0.7*gScreen.width,
      backgroundColor:'#7f7f7f',
      marginLeft:0.15*gScreen.width
    },
    navBarStyle:{
      height:gScreen.navBarHeight,
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center'
    },
    searchBarViewStyle:{
      justifyContent:'center',
      alignItems:'center',
      height:50,
      backgroundColor:'white',
      marginTop:1
    },
    sliderViewStyle:{
      height:30,
      backgroundColor:'white'
    }

});
