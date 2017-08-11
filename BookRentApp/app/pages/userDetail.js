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

export default class UserDetailScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			userId: 'AlexanderYao',
			userName: '邬文尧',
			token: '',
		};
	}

	render(){
		return (
			<View>
				<Text>UserDetailScreen</Text>
			</View>
		);
	}

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return {
			title: '个人详情',
		};
	};

	componentDidMount(){
		console.log('userDetail.componentDidMount');
	}
}