import React from 'react';
import {
	Text,
	View,
	Button,
} from 'react-native';

export default class UserHomeScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userInfo: {id: 'Alex', name: '邬文尧'},
		};
	}

	render(){
		return (
			<View>
				<Text>ID: {this.state.userInfo.id}</Text>
				<Text>Name: {this.state.userInfo.name}</Text>
			</View>
		);
	}
}