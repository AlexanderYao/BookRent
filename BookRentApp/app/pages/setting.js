import React from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	Switch,
	Picker,
} from 'react-native';
import Button from 'apsl-react-native-button';
import Toast from 'react-native-root-toast';
import {
	SUCCESS, 
	loginState,
} from '../utils/constants';
import styles from '../styles';

export default class SettingScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			allowSendMsg: true,
			allowAutoPay: true,
			needNotLogin: 'sixMonth',
		};
	}

	render(){
		return (
			<View>
				<View style={[styles.rowStyle, styles.rowStyleSpace]}>
					<Text style={styles.rowText}>允许推送消息</Text>
					<Switch value={this.state.allowSendMsg}
						onValueChange={(value) => this.setState({allowSendMsg: value})} 
						style={styles.rowTextRight}/>
				</View>

				<View style={[styles.rowStyle, styles.rowStyleSpace]}>
					<Text style={styles.rowText}>开启小额免密</Text>
					<Switch value={this.state.allowAutoPay}
						onValueChange={(value) => this.setState({allowAutoPay: value})} 
						style={styles.rowTextRight}/>
				</View>

				<View style={[styles.rowStyle, styles.rowStyleSpace]}>
					<Text style={styles.rowText}>免登录</Text>
					<Picker style={[styles.rowTextRight, {width:70}]}
						itemStyle={{height:40}}
						selectedValue={this.state.needNotLogin}
						onValueChange={(value) => this.setState({needNotLogin: value})}>
						<Picker.Item label='1个月' value='oneMonth'/>
						<Picker.Item label='3个月' value='threeMonth'/>
						<Picker.Item label='6个月' value='sixMonth'/>
					</Picker>
				</View>

				<View style={[styles.rowStyle, styles.rowStyleSpace]}>
					<Text style={styles.rowText}>版本号</Text>
					<Text style={[styles.rowText, styles.rowTextRight]}>1.0.0.alpha</Text>
				</View>
			</View>
		);
	}

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return {
			title: '设置',
		};
	};

	componentDidMount(){
		console.log('setting.componentDidMount');
	}
}