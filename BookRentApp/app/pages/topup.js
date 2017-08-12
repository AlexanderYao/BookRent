import React from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import Button from 'apsl-react-native-button';
import Toast from 'react-native-root-toast';
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {
	SUCCESS, 
	loginState,
} from '../utils/constants';
import styles from '../styles';

export default class TopupScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			userId: 'AlexanderYao',
			userName: '邬文尧',
			token: '',
			enumMoney: [
				{label:'充500元', value:500},
				{label:'充100元', value:100},
				{label:'充50元', value:50},
				{label:'充10元', value:10},
			],
			enumPayTypes: [
				{label:'支付宝支付', value:'zhifubao'},
				{label:'微信支付', value:'weixin'},
			],
			money: 10,
			payType: 'zhifubao',
		};
	}

	render(){
		return (
			<View>
				<View style={styles.rowStyle}>
					<Text style={styles.rowText}>充值金额</Text>
				</View>

				<RadioForm initial={this.state.money}
					radio_props={this.state.enumMoney}
					onPress={(value) => this.setState({money: value})} />

				<View style={styles.rowStyle}>
					<Text style={styles.rowText}>请选择支付方式</Text>
				</View>

				<RadioForm initial={this.state.payType}
					radio_props={this.state.enumPayTypes}
					onPress={(value) => this.setState({payType: value})} />

				<Button style={styles.rowButton} 
					onPress={() => this.props.navigation.navigate('TopupZhifubao')}>
					立即充值
				</Button>

				<Text style={{fontSize:12, marginLeft:30}}>
					点击立即充值，即表示您已阅读并同意《充值活动协议》
				</Text>
			</View>
		);
	}

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return {
			title: '充值',
		};
	};

	componentDidMount(){
		console.log('topup.componentDidMount');
	}

	selectMoney(aa, money){
		console.log(aa);
		console.log(money);
	}
}