import React from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import Button from 'apsl-react-native-button';
import Toast from 'react-native-root-toast';
import {
	SUCCESS, 
	loginState,
} from '../utils/constants';
import styles from '../styles';

export default class UserHomeScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			userId: 'AlexanderYao',
			userName: '邬文尧',
			token: '',
		};
	}

	render(){
		return (
			<View>
				<TouchableOpacity style={styles.rowStyle} onPress={() => this.navigateTo('UserDetail')}>
					<Image source={require('../images/book.png')} style={styles.avatar}/>
					<View style={{marginLeft: 20}}>
						<Text style={styles.rowText}>{this.state.userName}</Text>
						<Text style={[styles.rowText, {fontSize:13}]}>ID: {this.state.userId}</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity style={styles.rowStyle} onPress={() => this.navigateTo('Wallet')}>
					<Image source={require('../images/account.png')}  style={styles.image}/>
					<Text style={[styles.rowText, {marginTop: 0}]}>我的钱包</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.rowStyle} onPress={() => this.navigateTo('History')}>
					<Image source={require('../images/history.png')}  style={styles.image}/>
					<Text style={[styles.rowText, {marginTop: 0}]}>历史订单</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.rowStyle} onPress={() => this.navigateTo('Setting')}>
					<Image source={require('../images/set.png')}  style={styles.image}/>
					<Text style={[styles.rowText, {marginTop: 0}]}>设置</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.rowStyle} onPress={() => this.logout()}>
					<Image source={require('../images/scanning.png')}  style={styles.image}/>
					<Text style={[styles.rowText, {marginTop: 0}]}>退出</Text>
				</TouchableOpacity>
			</View>
		);
	}

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return {
			title: '用户中心',
		};
	};

	componentDidMount(){
		console.log('userHome.componentDidMount');
		// this.getStorage();
	}

	async getStorage(){
		let res;
		try{
			res = await storage.load({ key: loginState });
			this.setState({
				userId: res.userId,
				token: res.token,
			});
		}catch(err){
			console.log(err.message);
		}
	}

	navigateTo(screenName){
		this.props.navigation.navigate(screenName, {
			userId:this.state.userId, 
			token:this.state.token
		});
	}

	logout(){
		storage.remove({
			key: loginState
		});
		Toast.show('已登出', {duration:1000});
	}
}