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

export default class WalletScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			userId: 'AlexanderYao',
			userName: '邬文尧',
			token: '',
			balance: 200,
			redPackage: 1,
			coupon: 4,
		};
	}

	render(){
		return (
			<View>
				<View style={[styles.rowStyle, styles.rowStyleSpace]}>
					<Text style={styles.rowText}>余额</Text>
					<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.balance} 元</Text>
				</View>

				<View style={[styles.rowStyle, styles.rowStyleSpace]}>
					<Text style={styles.rowText}>红包</Text>
					<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.redPackage} 个</Text>
				</View>

				<View style={[styles.rowStyle, styles.rowStyleSpace]}>
					<Text style={styles.rowText}>优惠券</Text>
					<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.coupon} 张</Text>
				</View>

				<Button style={styles.rowButton} 
					onPress={() => this.props.navigation.navigate('Topup')}>
					充  值
				</Button>
			</View>
		);
	}

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return {
			title: '我的钱包',
		};
	};

	componentDidMount(){
		console.log('wallet.componentDidMount');
	}
}