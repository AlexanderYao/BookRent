import React from 'react';
import {
	Text,
	View,
} from 'react-native';
import Button from 'apsl-react-native-button';
import Toast from 'react-native-root-toast';
import {
	SUCCESS, 
	loginState,
} from '../utils/constants';

export default class UserHomeScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userId: '',
			token: '',
		};
	}

	render(){
		return (
			<View>
				<Text>ID: {this.state.userId}</Text>
				<Text>Token: {this.state.token}</Text>
				<Button onPress={() => this.logout()}>登出</Button>
			</View>
		);
	}

	componentWillMount(){
		console.log('in userHome componentWillMount');
	}

	componentDidMount(){
		console.log('in userHome componentDidMount');
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

	logout(){
		storage.remove({
			key: loginState
		});
		Toast.show('已登出', {duration:1000});
	}
}