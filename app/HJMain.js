'use strict';

import GlobalContants from './common/globalConstants';
import React,{Component} from 'react';
import {
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

import {StackNavigator, TabNavigator} from 'react-navigation';

import Home from './pages/Home/HJHome';
import Shop from './pages/Shop/HJShop';
import Category from './pages/Category/HJCategory';
import Mine from './pages/MemberCenter/Center';

import Login from './pages/Login/Login'

import ShopDetail from './pages/Shop/HJShopDetail';

let tabNavigationOptions = (label, icon) => {
  return {
    tabBarLabel: label,
    tabBarIcon: ({tintColor}) => (
      <Image
        source={icon}
        style={[{tintColor: tintColor}, styles.icon]}
      />
    )
  }
}

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
});


const MyApp = TabNavigator({
  Home: {
    screen: NavigationHome,
    navigationOptions: tabNavigationOptions('首页', require('./images/ico_dhshouye.png'))
  },
  Shop: {
    screen: NavigationShop,
    navigationOptions: tabNavigationOptions('店铺', require('./images/ico_dhdianpu.png'))
  },
  Category: {
    screen: NavigationCategory,
    navigationOptions: tabNavigationOptions('分类', require('./images/ico_dhfeilei.png'))
  },
  Mine: {
    screen: NavigationMine,
    navigationOptions: tabNavigationOptions('我的', require('./images/ico_dhwode.png'))
  }
}, {
  animationEnabled: false, // 切换页面时不显示动画b
  tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
  swipeEnabled: false, // 禁止左右滑动
  backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
  lazy: true, //默认为false,自动加载所有的tabBar页面,需要点击tabBar时再加载当前页面，设为true
  tabBarOptions: {
    activeTintColor: '#ea4335', // 文字和图片选中颜色
    inactiveTintColor: '#7f7f7f', // 文字和图片默认颜色
    showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
    indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    style: {
        backgroundColor: '#fff', // TabBar 背景色
    },
    labelStyle: {
        fontSize: 12, // 文字大小
        marginBottom: 5
    }
  }
})

module.exports = MyApp; 

const styles = StyleSheet.create({
    icon: {
      width: 22,
      height: 22,
      resizeMode: 'contain'
    }
});
