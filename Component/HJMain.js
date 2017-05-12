'use strict';

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

export default class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {selectedTab:'Home'};
  }

  render() {
    return (
      <TabNavigator>

        <TabNavigator>
              {/* 首页 */}
              {this.renderTabItem("首页",'ico_dhshouye','ico_dhshouyed','Home','Home',Home)}
              {/* 商家 */}
              {this.renderTabItem("店铺",'ico_dhdianpu','ico_dhdianpud','Shop','Shop',Shop)}
              {/* 我的 */}
              {this.renderTabItem("分类",'ico_dhfeilei','ico_dhfeileid','Mine','Mine',Mine)}
              {/* 更多 */}
              {this.renderTabItem("我的",'ico_dhwode','ico_dhwoded','More','More',More)}
            </TabNavigator>

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

module.exports = Main;
