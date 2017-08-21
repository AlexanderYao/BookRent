import React from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import Button from 'apsl-react-native-button';
import Toast from '../utils/toast';
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {
	RadioButtons
} from 'react-native-radio-buttons';
import Alipay from 'react-native-yunpeng-alipay';
import * as WeChat from 'react-native-wechat';
import * as constants from '../utils/constants';
import styles from '../styles';

export default class TopupScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			userId: '20170802121212000U000001',
			userName: '邬文尧',
			token: '',
			enumMoney: [
				{label:'充500元', value:"500"},
				{label:'充100元', value:"100"},
				{label:'充50元', value:"50"},
				// {label:'充10元', value:"10"},
				{label:'充0.01元', value:"0.01"},
			],
			enumPayTypes: [
				{label:'支付宝支付', value:'alipay'},
				{label:'微 信 支 付 ', value:'wechat_pay'},
			],
			money: "20.36",
			payType: 'alipay',
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

				<RadioForm initial={'alipay'}
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

	async topupNow(){
		console.log('topup.topupNow');
		try{
			let request = { 
				userId : this.state.userId,
				rechargeAmt: this.state.money,
				payType: this.state.payType, 
			};
			let response = await fetch(constants.recharge, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(request),
			});
			console.log(response);
			let resJson = await response.json();
			console.log(resJson);

			if(resJson.code !== constants.SUCCESS){
				Toast.show('获取订单号失败，支付取消');
				return;
			}else{
				let {orderId, orderInfo} = resJson.data;
				switch(this.state.payType){
					case 'alipay':
						this.alipay(orderInfo);
						break;
					case 'wechat_pay':
						this.wxpay();
						break;
					default:
						console.error('unknown payType');
				}
			}
		} catch(error){
			console.log(error);
		}
	}

	alipay(orderInfo){
		console.log('alipay');
		//let orderInfo = 'charset=utf-8&biz_content=%7B%22out_trade_no%22%3A%22170821000P00000035%22%2C%22total_amount%22%3A%2220.36%22%2C%22subject%22%3A%22%E4%B8%8A%E6%B5%B7%E4%BA%91%E6%8B%BF%E6%99%BA%E8%83%BD%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%22%2C%22body%22%3A%22%E4%BA%91%E6%8B%BF%E8%B4%A6%E6%88%B7%E5%85%85%E5%80%BC%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&method=alipay.trade.app.pay&format=JSON&sign=ff%2F7u4E6XmNyGi6DAfgrz%2BQc%2BQaqdnYqTgTO35LKDmiWd9kLuJNJEk6dlKw3NsxIPOETQARr5qITbVZ3w4f1FFDlzDWzA6BT1TG8fFhNu1uo%2BkuzSTqx9l0HV96yH9yR3r3m9OQvrUnvY%2B7PD%2BvnC11kRtEMr3NpycLmjbt68t0i%2FGiw4yQFA3rVqycPEyHal2iEzZ8U8KNWdu4jcI9esZmSfX472gKpLA8ss7%2B08tdOVDSpOV3K3B%2Bl5JhCvK5b4Tl6XfaQzMscZVxCeAoLZDFWcFCVM64XiyAHbbGzGDS2ZbsDOTNhIUZDpqRuDSGAawUZTVailHfQx16yrW98KQ%3D%3D&notify_url=http%3A%2F%2F10.10.10.141%3A8080%2Frest%2Fapi%2Fv1%2Ftrade%2Falipay_notify&app_id=2016080700190975&version=1.0&sign_type=RSA2&timestamp=2017-08-21+11%3A15%3A13';
		console.log(orderInfo);
		Alipay.payV2(orderInfo).then((data) => {
			console.log(data);
			if (data && data.resultStatus) {
				switch (data.resultStatus) {
					case "9000":
						Toast.show('支付成功')
						break;
					case "8000":
						Toast.show('支付结果未知,请查询订单状态')
						break;
					case "4000":
						Toast.show('订单支付失败')
						break;
					case "5000":
						Toast.show('重复请求')
						break;
					case "6001":
						Toast.show('用户中途取消')
						break;
					case "6002":
						Toast.show('网络连接出错')
						break;
					case "6004":
						Toast.show('支付结果未知,请查询订单状态')
						break;
					default:
						Toast.show('其他失败原因')
						break;
				}
			} else {
				Toast.show('其他失败原因')
			} 
		}, (err) => {
			console.log(err);
			Toast.show('支付失败，请重新支付')
		});
	}

	async wxpay(){
		console.log('weixin pay');
		let res = {
			appid: 'wx8888888888888888',	/*微信开放平台审核通过的应用APPID*/
      partnerId: '1900000109',  		/*商家向财付通申请的商家id*/
      prepayId: 'WX1217752501201407033233368018',    /*预支付订单*/
      nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',    /*随机串，防重发*/
      timeStamp: '1412000000',  /*时间戳，防重发*/
      package: 'Sign=WXPay',      /*商家根据财付通文档填写的数据和签名*/
      sign: 'C380BEC2BFD727A4B6845133519F3AD6',            /*商家根据微信开放平台文档对数据做的签名*/
		};

		try {
	    let result = await WeChat.pay({
	      partnerId: res.partnerid,  /*商家向财付通申请的商家id*/
	      prepayId: res.prepayid,    /*预支付订单*/
	      nonceStr: res.noncestr,    /*随机串，防重发*/
	      timeStamp: res.timestamp,  /*时间戳，防重发*/
	      package: res.package,      /*商家根据财付通文档填写的数据和签名*/
	      sign: res.sign,            /*商家根据微信开放平台文档对数据做的签名*/
	    });

	    console.log(result);
	    if(result.errCode === 0){
	    	Toast.show('支付成功');
	    }else if(result.errCode === -1){
	    	Toast.show('订单支付失败：'+result.errStr);
	    }else if(result.errCode === -2){
	    	Toast.show('用户取消');
	    }
	  } catch (error) {
	  	console.log(error);
	  	Toast.show('失败：'+error);
	  }
	}
}