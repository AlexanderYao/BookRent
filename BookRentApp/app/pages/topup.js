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
	RadioButtons
} from 'react-native-radio-buttons';
import Alipay from 'react-native-yunpeng-alipay';
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
				{label:'充0.01元', value:0.01},
			],
			enumPayTypes: [
				{label:'支付宝支付', value:'zhifubao'},
				{label:'微 信 支 付 ', value:'weixin'},
			],
			money: 10,
			payType: 'zhifubao',
			payTypeIndex: 0,
		};
	}

	render(){
		return (
			<View>
				<View style={styles.rowStyle}>
					<Text style={styles.rowText}>充值金额</Text>
				</View>

				<RadioButtons options={this.state.enumMoney}
					onSelection={(option) => this.setState({money: option.value})}
					selectedOption={this.state.money}
					renderOption={this.renderOption}
					renderContainer={this.renderContainer}
					extractText={(option) => option.label}
					testOptionEqual={(selectedValue, option) => selectedValue === option.value}
				/>

				<View style={styles.rowStyle}>
					<Text style={styles.rowText}>请选择支付方式</Text>
				</View>

				<RadioForm initial={'zhifubao'}
					animation={false}
				>
					{this.state.enumPayTypes.map((obj, i) => {
						let that = this;
						let isSelected = this.state.payTypeIndex == i;
						let onPress = (value, index) => {
							this.setState({
								payType: value,
								payTypeIndex: index,
							})
						};
						return (
							<RadioButton key={i} style={{margin:10}}>
								<RadioButtonLabel
									obj={obj}
									index={i}
									onPress={onPress}
									labelStyle={{fontSize:16}}
								/>
								<RadioButtonInput
									obj={obj}
									index={i}
									isSelected={this.state.payTypeIndex === i}
									onPress={onPress}
									buttonSize={10}
									buttonStyle={{marginLeft:200}}
								/>
							</RadioButton>
						)
					})}
				</RadioForm>

				<Button style={styles.rowButton} 
					onPress={() => this.topupNow()}>
					立即充值
				</Button>

				<Text style={{fontSize:12, marginLeft:30}}>
					点击立即充值，即表示您已阅读并同意
					<Text onPress={() => this.props.navigation.navigate('TermOfServiceTopup')}
						style={styles.textLink}>
						《充值活动协议》
					</Text>
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

	renderOption(option, selected, onSelect, index){
		const style = {
			width: 150,
			borderWidth: 1,
			padding: 10,
			margin: 10,
			fontSize: 20,
			textAlign: 'center',
			borderColor: 'gray',
			borderRadius: 4,
		};
		const styleSelected = selected ? {backgroundColor:'gold'} : {};
		return (
			<TouchableOpacity key={index} onPress={onSelect}>
				<Text style={[style, styleSelected]}>{option.label}</Text>
			</TouchableOpacity>
		)
	}

	renderContainer(optionNodes){
		return <View style={{
			flexDirection:'row', 
			flexWrap:'wrap',
			justifyContent:'center',
		}}>{optionNodes}</View>
	}

	topupNow(){
		switch(this.state.payType){
			case 'zhifubao':
				let params = {
					orderString: 'app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22IQJZSRC1YMQB5HU%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fdomain.merchant.com%2Fpayment_notify&sign_type=RSA2&timestamp=2016-08-25%2020%3A26%3A31&version=1.0&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj%2By48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp%2FM45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g%3D',
				};
				console.log(Alipay);
				Alipay.pay(params.orderString).then((data) => {
					if (data.length && data[0].resultStatus) {
						/*处理支付结果*/
						switch (data[0].resultStatus) {
							case "9000":
								opt.success && opt.success(data)
								break;
							case "8000":
								opt.fail && opt.fail('支付结果未知,请查询订单状态')
								break;
							case "4000":
								opt.fail && opt.fail('订单支付失败')
								break;
							case "5000":
								opt.fail && opt.fail('重复请求')
								break;
							case "6001":
								opt.fail && opt.fail('用户中途取消')
								break;
							case "6002":
								opt.fail && opt.fail('网络连接出错')
								break;
							case "6004":
								opt.fail && opt.fail('支付结果未知,请查询订单状态')
								break;
							default:
								opt.fail && opt.fail('其他失败原因')
								break;
						}
					} else {
						opt.fail && opt.fail('其他失败原因')
					} 
				}, (err) => {
					opt.fail && opt.fail('支付失败，请重新支付')
				});
				break;
			case 'weixin':
				console.log('weixin pay');
				break;
			default:
				console.error('unknown payType');
		}
	}
}