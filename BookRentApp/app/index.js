import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  ListView,
  ScrollView,
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import QrCodeScreen from './pages/qrcode.js';
import ShopcartScreen from './pages/shopcart.js';
import ShopcartDetailScreen from './pages/shopcartDetail.js';
import UserHomeScreen from './pages/userHome.js';

const QrCodeStackNavigator = StackNavigator({
	QrCode: {screen: QrCodeScreen},
});

const ShopcartStackNavigator = StackNavigator({
  Shopcart: {screen: ShopcartScreen},
  ShopcartDetail: {screen: ShopcartDetailScreen},
});

const UserStackNavigator = StackNavigator({
	UserHome: {screen: UserHomeScreen},
});

const MainTabNavigator = TabNavigator({
	QrCode: {
		screen: QrCodeStackNavigator,
		navigationOptions: ({navigation}) => ({
			tabBarLabel: '二维码',
			// tabBarIcon: ()
		}),
	},
	Shopcart: {
		screen: ShopcartStackNavigator,
		navigationOptions: ({navigation}) => ({
			tabBarLabel: '我的书架',
			// tabBarIcon: ()
		}),
	},
	User: {
		screen: UserStackNavigator,
		navigationOptions: ({navigation}) => ({
			tabBarLabel: '个人中心',
			// tabBarIcon: ()
		}),
	},
});

AppRegistry.registerComponent('BookRentApp', () => MainTabNavigator);
