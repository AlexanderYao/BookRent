import React from 'react';
import {
	Text,
	View,
	Button,
	StyleSheet,
	TouchableHighlight,
} from 'react-native';
import QRCode from 'react-native-qrcode';
import Toast from 'react-native-root-toast';
import format from 'string-format';
import {
	SUCCESS,
	loginState,
	entry,
} from '../utils/constants';
import styles from '../styles';

class QrCodeScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userId: '',
			token: '',
			url: '',
		}
	}
	
	render(){
		return (
			<View style={styles.flexCenter}>
				<TouchableHighlight
					underlayColor='transparent'
					onPress={() => this.getUrl()} >
					<View>
						<QRCode value={this.state.url} size={200}
							bgColor='black' fgColor='white'/>
						<Text style={{textAlign:'center', marginTop:10}}>点击刷新</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return {
			title: '二维码',
			headerRight: <Button title="刷新" onPress={() => params.handleRefresh()} />,
		};
	};

	componentDidMount(){
		console.log('qrcode.componentDidMount');
		this.props.navigation.setParams({handleRefresh: () => this.getStorageUrl()});
		this.getStorageUrl();
	}

	getStorageUrl(){
		this.getStorage().then(value => {
			this.getUrl();
		}, error => {
			console.log(error.message);
			switch(error.name){
				case 'NotFoundError':
					this.props.navigation.navigate('Register');
					return;
				case 'ExpiredError':
					this.props.navigation.navigate('Register');
					return;
			}
		});
	}

	async getStorage(){
		console.log('qrcode.getStorage');
		let res = await storage.load({ key: loginState });
		console.log(res);
		this.setState({
			userId: res.userId,
			token: res.token,
		});
	}

	async getUrl(){
		try{
			console.log('qrcode.getUrl');
			let userId = this.state.userId;
			let token = this.state.token;

			if(!userId || !token){
				return;
			}

			let request = {
				userId: userId,
				token: token,
			};
			let url = format(entry, request);
			let response = await fetch(url);
			let responseJson = await response.json();
			console.log(responseJson);
			this.setState({url: responseJson.entry});
		}catch(error){
			console.error(error);
		}
	}
}

export default QrCodeScreen;