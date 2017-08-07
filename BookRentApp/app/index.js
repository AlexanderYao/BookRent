import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  ListView,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Storage from 'react-native-storage';

import QrCodeScreen from './pages/qrcode.js';
import RegisterScreen from './pages/register.js';
import TermOfServiceScreen from './pages/termOfService.js';
import ShopcartScreen from './pages/shopcart.js';
import ShopcartDetailScreen from './pages/shopcartDetail.js';
import UserHomeScreen from './pages/userHome.js';

const storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: 90 * 24 * 3600 * 1000, // 90天
	enableCache: true,
});
global.storage = storage;

const QrCodeStackNavigator = StackNavigator({
	QrCode: {screen: QrCodeScreen},
	Register: {screen: RegisterScreen},
	termOfService: {screen: TermOfServiceScreen},
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
