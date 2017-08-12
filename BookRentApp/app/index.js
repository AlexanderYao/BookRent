import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ListView,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Storage from 'react-native-storage';

import QrCodeScreen from './pages/qrcode';
import RegisterScreen from './pages/register';
import TermOfServiceScreen from './pages/termOfService';

import ShopcartScreen from './pages/shopcart';
import ShopcartDetailScreen from './pages/shopcartDetail';

import UserHomeScreen from './pages/userHome';
import UserDetailScreen from './pages/userDetail';
import WalletScreen from './pages/wallet';
import TopupScreen from './pages/topup';
import HistoryScreen from './pages/history';
import SettingScreen from './pages/setting';

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
	TermOfService: {screen: TermOfServiceScreen},
});

const ShopcartStackNavigator = StackNavigator({
  Shopcart: {screen: ShopcartScreen},
  ShopcartDetail: {screen: ShopcartDetailScreen},
});

const UserStackNavigator = StackNavigator({
	UserHome: {screen: UserHomeScreen},
	UserDetail: {screen: UserDetailScreen},
	Wallet: {screen: WalletScreen},
	Topup: {screen: TopupScreen},
	History: {screen: HistoryScreen},
	Setting: {screen: SettingScreen},
});

const MainTabNavigator = TabNavigator({
	QrCode: {
		screen: QrCodeStackNavigator,
		navigationOptions: ({navigation}) => ({
			tabBarLabel: '二维码',
			tabBarIcon: ({tintColor}) => (
				<Image source={require('./images/qrcode.png')}
					style={{width:25, height:25}}/>
			)
		}),
	},
	Shopcart: {
		screen: ShopcartStackNavigator,
		navigationOptions: ({navigation}) => ({
			tabBarLabel: '我的书架',
			tabBarIcon: ({tintColor}) => (
				<Image source={require('./images/shelf.png')}
					style={{width:25, height:25}}/>
			)
		}),
	},
	User: {
		screen: UserStackNavigator,
		navigationOptions: ({navigation}) => ({
			tabBarLabel: '个人中心',
			tabBarIcon: ({tintColor}) => (
				<Image source={require('./images/account.png')}
					style={{width:25, height:25}}/>
			)
		}),
	},
});

AppRegistry.registerComponent('BookRentApp', () => MainTabNavigator);
