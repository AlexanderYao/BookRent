import React from 'react';
import {
	Text,
	View,
	Button,
} from 'react-native';

export default class TermOfServiceTopupScreen extends React.Component {
	static navigationOptions = {
		title: '充值活动协议',
	};

	render(){
		return (
			<View style={{margin:10}}>
				<Text style={{marginTop:10}}>充值活动协议</Text>
				<Text style={{marginTop:10}}>尊敬的用户，为保障您的合法权益，请您在参加充值活动前仔细阅读本规则，以免造成误解。当您点击『立即充值』按钮后，即视为您已经阅读、理解本协议，并同意按本协议的规定参与充值。</Text>
				<Text style={{marginTop:10}}>1. 活动内容</Text>
				<Text style={{marginTop:10}}>单笔充值500元，账户共存入500元余额。</Text>
				<Text style={{marginTop:10}}>单笔充值100元，账户共存入100元余额。</Text>
				<Text style={{marginTop:10}}>单笔充值50元，账户共存入50元余额。</Text>
				<Text style={{marginTop:10}}>单笔充值10元，账户共存入10元余额。</Text>
				<Text style={{marginTop:10}}>2. 账户金额说明</Text>
				<Text style={{marginTop:10}}>本协议各条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</Text>
				<Text style={{marginTop:10}}>3. 正当性保证</Text>
				<Text style={{marginTop:10}}>本协议各条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</Text>
				<Text style={{marginTop:10}}>4. 其他说明</Text>
				<Text style={{marginTop:10}}>本协议各条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</Text>
			</View>
		);
	}
}