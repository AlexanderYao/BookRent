import React from 'react';
import {
	Text,
	View,
	Button,
} from 'react-native';

export default class TermOfServiceScreen extends React.Component {
	static navigationOptions = {
		title: '服务条款',
	};

	render(){
		return (
			<View style={{margin:10}}>
				<Text style={{marginTop:10}}>用户服务协议</Text>
				<Text style={{marginTop:10}}>提示条款</Text>
				<Text style={{marginTop:10}}>欢迎您与云拿科技共同签署本《用户服务协议》，并使用云拿科技平台服务。</Text>
				<Text style={{marginTop:10}}>本协议各条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</Text>
				<Text style={{marginTop:10}}>1. 定义</Text>
				<Text style={{marginTop:10}}>本协议各条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</Text>
				<Text style={{marginTop:10}}>2. 协议范围</Text>
				<Text style={{marginTop:10}}>本协议各条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</Text>
				<Text style={{marginTop:10}}>3. 用户注册与认证</Text>
				<Text style={{marginTop:10}}>本协议各条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</Text>
				<Text style={{marginTop:10}}>4. 账户安全规范</Text>
				<Text style={{marginTop:10}}>本协议各条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</Text>
			</View>
		);
	}
}