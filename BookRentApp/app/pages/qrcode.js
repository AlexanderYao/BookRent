import React from 'react';
import {
	Text,
	View,
	Button,
	StyleSheet,
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
				<QRCode value={this.state.url} size={200}
					bgColor='black' fgColor='white'/>
			</View>
		);
	}

	componentDidMount(){
		this.getStorage();
		// this.getUrl();
	}

	getStorage(){
		storage.load({
			key: loginState,
		}).then(res => {
			this.setState({
				userId: res.userId,
				token: res.token,
			});

			let entryRes = this.getUrl();
			if(SUCCESS === entryRes.code){
				this.setState({url: entryRes.entry});
			}else{
				this.props.navigation.navigate('Register');
			}
		}).catch(err => {
			console.log(err.message);
			switch(err.name){
				case 'NotFoundError':
					this.props.navigation.navigate('Register');
					break;
				case 'ExpiredError':
					this.props.navigation.navigate('Register');
					break;
			}
		});
	}

	async getUrl(){
		try{
			let request = {
				userId: this.state.userId,
				token: this.state.token,
			};
			let url = format(entry, request);
			let response = await fetch(url);
			let responseJson = await response.json();
			return responseJson;
		}catch(error){
			console.error(error);
		}
	}
}

export default QrCodeScreen;