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
			<View>
				<Text>尊敬的用户：</Text>
				<Text>balabalabala</Text>
			</View>
		);
	}
}