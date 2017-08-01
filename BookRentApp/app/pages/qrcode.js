import React from 'react';
import {
	Text,
	View,
	Button,
	StyleSheet,
} from 'react-native';
import QRCode from 'react-native-qrcode';

import styles from '../styles.js';

class QrCodeScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			qrcode: 'AlexanderYao',
		}
	}
	
	render(){
		return (
			<View style={styles.flexCenter}>
				<QRCode value={this.state.qrcode} size={200}
					bgColor='black' fgColor='white'/>
			</View>
		);
	}
}

export default QrCodeScreen;