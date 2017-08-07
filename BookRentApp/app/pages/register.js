import React from 'react';
import {
	Text,
	View,
	Button,
	Image,
	TextInput,
} from 'react-native';
import format from 'string-format';
import Toast from 'react-native-root-toast';
import CheckBox from 'react-native-checkbox';
import { NavigationActions } from 'react-navigation';
import Constants from '../utils/constants.js';

export default class RegisterScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			phoneNo: '',
			sendEnabled: false,
			code: '',
			agreeChecked: true,
			loginEnabled: false,
		}
	}

	sendCode(){
		let response = this.sendCodeImpl(this.state.phoneNo);
		if(Constants.SUCCESS === response.code){
			Toast.show('短信已发送，请查收');
		}else{
			Toast.show('发送失败：'+response.message);
		}

		//MOCK
		this.setState({code: '1001'});
	}

	async sendCodeImpl(phoneNo){
		try{
			let request = { phoneNo : this.state.phoneNo };
			let url = format(Constants.getCaptcha, request);
			let response = await fetch(url);
			let responseJson = await response.json();
			return responseJson;
		} catch(error){
			console.error(error);
			return {
				code: Constants.SUCCESS,
			};
		}
	}

	updateLoginEnabled(){
		this.setState({loginEnabled: this.state.agreeChecked});
	}

	showTermOfService(){
		const { navigate } = this.props.navigation;
		navigate('TermOfService');
	}

	login(){
		let response = this.loginImpl();
		if(Constants.SUCCESS === response.code){
			Toast.show('注册成功！');
			storage.save({
				key: Constants.loginState,
				data: {
					userId: response.userId,
					token: response.token,
					entry: response.entry,
				},
			})
			this.props.navigation.back();

			// const backAction = NavigationActions.back({
			// 	key: 'QrCode'
			// });
			// this.props.navigation.dispatch(backAction);
		}else{
			Toast.show('注册失败：'+response.message);
		}
	}

	async loginImpl(){
		try{
			let request = {
				phoneNo: this.state.phoneNo,
				captcha: this.state.code,
			};
			let response = await fetch(Constants.login, {
				method: 'POST',
				body: JSON.stringify(request)
			});
			let responseJson = await response.json();
			return responseJson;
		}catch(error){
			console.error(error);
			return { 
				code: Constants.SUCCESS,
				userId: this.state.phoneNo,
				token: 'AD775KJAL456K63D',
				entry: 'http://www.yunna.me/api/entry/7894561234567/U1LX097XRS',
			};
		}
	}

	render(){
		return (
			<View>
				<Image source={require('../images/book.png')}/>
				<TextInput placeholder="手机号" value={this.state.phoneNo}
					keyboardType='numeric' maxLength={11}
					onChangeText={(text)=>{
						console.log('phoneNo: '+text);
						this.setState({phoneNo: text});	
						let sendEnabled = /^1[0-9]{10}$/.test(this.state.phoneNo);
						console.log('sendEnabled = '+sendEnabled);
						this.setState({sendEnabled: sendEnabled});
					}}/>
				<TextInput placeholder="验证码" value={this.state.code} />
				<Button title="发送" onPress={this.sendCode} disabled={!this.sendEnabled} />
				<CheckBox lable='已阅读并同意' 
					checked={this.state.agreeChecked}
					onChange={(checked) => this.updateLoginEnabled()}/>
				<Text onPress={this.showTermOfService}>《服务条款》</Text>
				<Button title='注册/登录' onPress={this.login} />
			</View>
		)
	}
}