'use strict';

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
import {StackNavigator} from 'react-navigation';


import ShopDetail from './pages/Shop/HJShopDetail';
import Login from './pages/Login/Login';
import Adress from './pages/AdressManner/Adress';

const NavigationHome = StackNavigator({
    Home: {screen: Home},
});
const NavigationShop = StackNavigator({
    Shop: {screen: Shop},
    ShopDetail: {screen: ShopDetail}
});
const NavigationCategory = StackNavigator({
    Category: {screen: Category},
});
const NavigationMine = StackNavigator({
    Mine: {screen: Mine},
    MineLogin: {screen: Login},
    MineAdress: {screen: Adress},
});

import Home from './pages/Home/HJHome';
import Shop from './pages/Shop/HJShop';
import Category from './pages/Category/HJCategory';
import Mine from './pages/Mine/HJMine';


export default class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {selectedTab:'Home'};
  }

  render() {
    return (
      <TabNavigator>

        {/* 首页 */}
        {this.renderTabItem("首页",require('./images/ico_dhshouye.png'),require('./images/ico_dhshouyed.png'),'Home','Home',Home,'12')}
        {/* 商家 */}
        {this.renderTabItem("店铺",require('./images/ico_dhdianpu.png'),require('./images/ico_dhdianpud.png'),'Shop','Shop',Shop)}
        {/* 我的 */}
        {this.renderTabItem("分类",require('./images/ico_dhfeilei.png'),require('./images/ico_dhfeileid.png'),'Category','Category',Category)}
        {/* 更多 */}
        {this.renderTabItem("我的",require('./images/ico_dhwode.png'),require('./images/ico_dhwoded.png'),'Mine','Mine',Mine)}


      </TabNavigator>
    );
  }

  renderTabItem(title,icon,selectedIcon,selectedTab,componentName,component,badgeText){
      {/* 首页 */}
      return(
        <TabNavigator.Item
          title={title}
          renderIcon={() => <Image source={icon} style={styles.iconStyle}/>}
          renderSelectedIcon={() => <Image source={selectedIcon} style={styles.iconStyle}/>}
          onPress={() => {this.setState({selectedTab:selectedTab})}}
          selected = {this.state.selectedTab==selectedTab}
          selectedTitleStyle={styles.selectedTitleStyle}
          badgeText = {badgeText}
        >
          {this.renderChildNavigator(componentName)}
        </TabNavigator.Item>
      )
    }

  renderChildNavigator(item){
    // alert(item);

    if (item === 'Home') {
      return (<NavigationHome/>)
    }else if(item === 'Shop'){
      return (<NavigationShop/>)

    }else if(item === 'Category'){
      return (<NavigationCategory/>)

    }else if(item === 'Mine'){
      return (<NavigationMine/>)
    }
    else{
      return (<Text>出错了!!!</Text>)
    }
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