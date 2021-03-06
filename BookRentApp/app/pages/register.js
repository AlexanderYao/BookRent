import React from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	ViewPropTypes,
} from 'react-native';
import format from 'string-format';
import Toast from 'react-native-root-toast';
import CheckBox from 'react-native-checkbox';
import { NavigationActions } from 'react-navigation';
import Button from 'apsl-react-native-button';
import {
	SUCCESS, 
	loginState,
	getCaptcha,
	login,
} from '../utils/constants';
import styles from '../styles';

export default class RegisterScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			phoneNo: '',
			phoneNoReady: false,
			code: '',
			codeReady: false,
		};
	}

	static navigationOptions = {
		title: '登录',
		headerLeft: null,
	};

	render(){
		return (
			<View style={{flex:1, alignItems:'center'}}>
				<View style={{height:200, alignItems:'center', justifyContent:'center'}}>
					<Image source={require('../images/book.png')} style={{width:50, height:50}}/>
					<Text style={{fontSize:18, fontWeight:'bold'}}>AIGO</Text>
					{/*<Text>this.state.phoneNo: {this.state.phoneNo}</Text>
					<Text>this.state.phoneNoReady: {''+this.state.phoneNoReady}</Text>*/}
				</View>
				<TextInput placeholder="手机号" value={this.state.phoneNo}
					style={{width:'85%', borderBottomWidth:1}}
					keyboardType='numeric' autoFocus={true}
					onChangeText={(text) => this.inputPhoneNo(text)}/>
				<View style={{flexDirection:'row', marginTop:10}}>
					<TextInput placeholder="验证码" 
						keyboardType='numeric' 
						value={this.state.code} 
						onChangeText={(text) => this.inputCode(text)}
						style={{width:'60%', borderBottomWidth:1}}/>
					<Button onPress={() => this.sendCode()} 
						isDisabled={!this.state.phoneNoReady} 
						style={{height:30, width:'25%', borderWidth:0, borderRadius:2, backgroundColor:'gold'}}>
						发送
					</Button>
				</View>

				<View style={{flexDirection:'row', marginTop:10, marginLeft:30, alignSelf:'flex-start'}}>
					<Image source={require('../images/checked.png')} style={{width:15, height:15, marginRight:10}}/>
					<Text>
						已阅读并同意
						<Text onPress={() => this.showTermOfService()}
							style={styles.textLink}>
							《服务条款》
						</Text>
					</Text>
				</View>

				<Button title='注册/登录' onPress={() => this.doLogin()} 
					isDisabled={!this.state.phoneNoReady || !this.state.codeReady}
					style={styles.rowButton}>
					注册/登录
				</Button>
			</View>
		)
	}

	inputPhoneNo(text){
		console.log('phoneNo: '+text);
		this.setState({phoneNo: text});	
		let tmp = /^1[0-9]{10}$/.test(text);
		console.log('phoneNoReady = '+tmp);
		this.setState({phoneNoReady: tmp});
	}

	inputCode(text){
		console.log('code: '+text);
		this.setState({code: text});	
		let tmp = /^[0-9]{4}$/.test(text);
		this.setState({codeReady: tmp});
	}

	sendCode(){
		this.sendCodeImpl(this.state.phoneNo).then(response => {
			if(SUCCESS === response.code){
				Toast.show('短信已发送，请查收', {duration:1000});
			}else{
				Toast.show('发送失败：'+response.message, {duration:1000});
			}

			this.setState({
				code: response.captcha,
				codeReady: true,
			});
		}, error => {
			console.log(error);
		});
	}

	async sendCodeImpl(phoneNo){
		try{
			let request = { phoneNo : phoneNo };
			let url = format(getCaptcha, request);
			console.log('url: '+url);
			let response = await fetch(url);
			let responseJson = await response.json();
			return responseJson;
		} catch(error){
			console.log(error);
		}
	}

	showTermOfService(){
		this.props.navigation.navigate('TermOfService');
	}

	doLogin(){
		this.loginImpl().then(response => {
			console.log(response);
			if(SUCCESS === response.code){
				Toast.show('注册/登录成功！', {duration:1000});
				storage.save({
					key: loginState,
					data: {
						userId: response.userId,
						token: response.token,
					},
				})

				this.props.navigation.goBack();
			}else{
				Toast.show('注册/登录失败：'+response.message, {duration:1000});
			}
		}, error => {
			console.log(error);
		});
	}

	async loginImpl(){
		try{
			console.log(login);
			let request = {
				phoneNo: this.state.phoneNo,
				captcha: this.state.code,
			};
			let response = await fetch(login, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(request),
			});
			let responseJson = await response.json();
			return responseJson;
		}catch(error){
			console.error(error);
		}
	}
}