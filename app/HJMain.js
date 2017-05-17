'use strict';

import GlobalContants from './common/globalConstants';
import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Platform,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import { Navigator } from 'react-native-deprecated-custom-components';

import Home from './pages/Home/HJHome';
import Shop from './pages/Shop/HJShop';
import Category from './pages/Category/HJCategory';
import Mine from './pages/Mine/HJMine';


export default class Main extends React.Component {

  // Main.propTypes = {
  //   title:React.PropTypes.bool
  // };
  //
  // Main.defaultProps = {
  //   title:'title'
  // };


  constructor(props){
    super(props);
    this.state = {selectedTab:'Home'};
  };



  render() {
    return (
      <TabNavigator>

        {/* 首页 */}
        {this.renderTabItem("首页",'ico_dhshouye','ico_dhshouyed','Home','Home',Home,'12')}
        {/* 商家 */}
        {this.renderTabItem("店铺",'ico_dhdianpu','ico_dhdianpud','Shop','Shop',Shop)}
        {/* 我的 */}
        {this.renderTabItem("分类",'ico_dhfeilei','ico_dhfeileid','Category','Category',Category)}
        {/* 更多 */}
        {this.renderTabItem("我的",'ico_dhwode','ico_dhwoded','Mine','Mine',Mine)}

      </TabNavigator>
    );
  }

  renderTabItem(title,icon,selectedIcon,selectedTab,componentName,component,badgeText){
      {/* 首页 */}
      return(
        <TabNavigator.Item
          title={title}
          renderIcon={() => <Image source={{uri:icon}} style={styles.iconStyle}/>}
          renderSelectedIcon={() => <Image source={{uri:selectedIcon}} style={styles.iconStyle}/>}
          onPress={() => {this.setState({selectedTab:selectedTab})}}
          selected = {this.state.selectedTab==selectedTab}
          selectedTitleStyle={styles.selectedTitleStyle}
          badgeText = {badgeText}
        >
          <Navigator
            initialRoute={{name: componentName, component: component}}
            configureScene={()=>{
              return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route, navigator) =>{
              let Component = route.component;
              return <Component {...route.passProps} navigator={navigator}/>
            }}
          />
        </TabNavigator.Item>
      )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    iconStyle:{
      width: Platform.OS === 'ios' ? 30 :25,
      height:30
    },
    selectedTitleStyle:{
      color:'orange'
    }
});

module.exports = Main;
